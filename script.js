function updateCanvas() {
    const text = document.getElementById('text').value;
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const yPosition = Math.min(100,Math.max(0,parseInt(document.getElementById('yPosition').value)));
    const textColor = document.getElementById('textColor').value;
    const shadowColor = document.getElementById('shadowColor').value;
    const bgImageInput = document.getElementById('bgImage');
    const bgImage = bgImageInput.files[0];
    const bgColor = document.getElementById('bgColor').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);

    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.innerHTML = ''; // Clear previous canvases

    const lines = text.split('\n');
    for (let line of lines) {
        createImageWithText(line, width, height, bgColor, textColor, shadowColor, yPosition, fontSize, bgImage, canvasContainer);
    }
}

function createImageWithText(text, width, height, bgColor, textColor, shadowColor, yPosition, fontSize, bgImage, container) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Draw background
    if (bgImage) {
        //drawBackgroundImage(ctx, bgImage, width, height);
		
		const img = new Image();
		img.onload = function() {
			ctx.drawImage(img, 0, 0, width, height);
			drawTextWithShadow(ctx, text, width, height, yPosition, textColor, shadowColor, fontSize);
		};
		img.src = URL.createObjectURL(bgImage);
    } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
		drawTextWithShadow(ctx, text, width, height, yPosition, textColor, shadowColor, fontSize);
    }

	//drawTextWithShadow(ctx, text, width / 2, height * (yPosition / 100), textColor, shadowColor, fontSize);
    container.appendChild(canvas);
	
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function drawBackgroundImage(ctx, image, width, height) {
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = URL.createObjectURL(image);
}

function drawTextWithShadow(ctx, text, width, height, yPosition, textColor, shadowColor, fontSize) {
	ctx.font = `${fontSize}px 'Roboto Slab', serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = 8;
    ctx.lineWidth = 3;
    ctx.strokeStyle = shadowColor;
	
	const margin = width/25;
    const maxWidth = width - 2 * margin;
    const lines = wrapText(ctx, text, maxWidth);
	const totalTextHeight = lines.length * fontSize;
    let textY = (height) * (yPosition / 100);
	
	console.log(width)
	console.log(height)
	
	console.log(fontSize)
	console.log(totalTextHeight)
	
	for (let line of lines) {
		ctx.strokeText(line, width / 2, textY);
        ctx.fillText(line, width / 2, textY);
		textY += fontSize;
    }
	
	
    //ctx.strokeText(text, x, y);
    //ctx.fillText(text, x, y);
}

// Initial canvas creation
updateCanvas();