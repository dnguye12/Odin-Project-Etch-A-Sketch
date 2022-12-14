let tableSize = 16;

    let sketch = document.getElementById("sketch");
    sketch.style.height = sketch.style.width.toString() + "px";

    let mouseDown = false
    document.body.onmousedown = () => (mouseDown = true)
    document.body.onmouseup = () => (mouseDown = false)


    let color = "black";
    let rand = false;
    let ColorPicker = document.getElementById("colorpicker");
    ColorPicker.addEventListener("change", function () {
        color = ColorPicker.value;
        updateColor();
    });

    let style = document.createElement("style");
    document.head.appendChild(style);

    function sketchInit() {
        while(sketch.lastElementChild) {
            sketch.removeChild(sketch.lastElementChild);
        }
        for (let i = 1; i <= tableSize; i++) {
            let row = document.createElement("tr");
            for (let j = 1; j <= tableSize; j++) {
                let cell = document.createElement("td");
                cell.style.height = (parseFloat(sketch.offsetHeight) / tableSize).toString() + "px";
                cell.style.width = (parseFloat(sketch.offsetWidth) / tableSize).toString() + "px";
                cell.style.border = "none";
                cell.style.padding = "0";
                cell.style.margin = "0";
                cell.classList.add("cell");
                cell.addEventListener("click", setCellColor);
                cell.addEventListener("mouseover", setCellColorHover);
                row.appendChild(cell);
            }
            row.style.padding = "0";
            row.style.margin = "0";
            sketch.appendChild(row);
        }
    }
    sketchInit();

    function setCellColor(e) {
        if(rand) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            color = `rgb(${r},${g},${b})`;
            e.target.style.backgroundColor = color;
            updateColor();
        }else {
        e.target.style.backgroundColor = color;
        }
    }

    function setCellColorHover(e) {
        if(mouseDown) {
            if(rand) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            color = `rgb(${r},${g},${b})`;
            e.target.style.backgroundColor = color;
            updateColor();
        }else {
        e.target.style.backgroundColor = color;
        }
        }
    }

    function updateColor() {
        let r = document.querySelector(':root');
        r.style.setProperty("--cell-color", color);
    }

    let btnClear = document.getElementById("btnClear");
    btnClear.addEventListener("click", function() {
        let cells = sketch.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.style.backgroundColor = "white";
        } );
    } );

    let btnOne = document.getElementById("oneC");
    let btnRain = document.getElementById("rainC");
    let btnEraser = document.getElementById("btnEraser");

    function resetActive() {
        let btns =document.querySelectorAll("button");
        btns.forEach( (btn) => {
            if(btn.classList.contains("active")) {
                btn.classList.remove("active");
            }
        } );
        rand = false;
    }

    btnOne.addEventListener("click", function() {
        if(!btnOne.classList.contains("active")) {
            resetActive();
            btnOne.classList.add("active");
            color = ColorPicker.value;
            updateColor();
        }
    });

    
    btnRain.addEventListener("click", function() {
        if(!btnRain.classList.contains("active")) {
            resetActive();
            btnRain.classList.add("active");
            rand = true;
            updateColor();
        }
    });

    btnEraser.addEventListener("click", function() {
        if(!btnEraser.classList.contains("active")) {
            resetActive();
            btnEraser.classList.add("active");
            color = "white";
            updateColor();
        }
    });

    let sizeLabel = document.querySelector("label");
    let sizeSlide = document.getElementById("size");
    sizeSlide.addEventListener("change", function() {
        tableSize = sizeSlide.value;
        sketchInit();
        sizeLabel.textContent = tableSize + " x " + tableSize;
    });