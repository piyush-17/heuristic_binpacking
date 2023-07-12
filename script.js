let binCounter = 1;

function runBestFit() {
    reset();

    let container = document.getElementById("container");
    let binSize = parseInt(document.getElementById("inputBinSize").value);
    let itemSizesInput = document.getElementById("inputItemSizes").value;
    let itemSizes = itemSizesInput.split(",").map(item => parseInt(item.trim()));

    for (let i = 0; i < itemSizes.length; i++) {
        let size = itemSizes[i];
        let bins = container.getElementsByClassName("bin");
        let binIndex = findBestFitBin(bins, size, binSize);

        if (binIndex === -1) {
            createNewBin(container, size, binSize);
            binIndex = bins.length - 1;
        }

        let bin = bins[binIndex];
        setTimeout(() => addItemToBin(bin, size), i * 1000);
    }
}

function runBestFitDecreasing() {
    reset();

    let container = document.getElementById("container");
    let binSize = parseInt(document.getElementById("inputBinSize").value);
    let itemSizesInput = document.getElementById("inputItemSizes").value;
    let itemSizes = itemSizesInput.split(",").map(item => parseInt(item.trim()));

    itemSizes.sort((a, b) => b - a); // Sort items in descending order

    for (let i = 0; i < itemSizes.length; i++) {
        let size = itemSizes[i];
        let bins = container.getElementsByClassName("bin");
        let binIndex = findBestFitBin(bins, size, binSize);

        if (binIndex === -1) {
            createNewBin(container, size, binSize);
            binIndex = bins.length - 1;
        }

        let bin = bins[binIndex];
        setTimeout(() => addItemToBin(bin, size), i * 1000);
    }
}

function runFirstFit() {
    reset();

    let container = document.getElementById("container");
    let binSize = parseInt(document.getElementById("inputBinSize").value);
    let itemSizesInput = document.getElementById("inputItemSizes").value;
    let itemSizes = itemSizesInput.split(",").map(item => parseInt(item.trim()));

    for (let i = 0; i < itemSizes.length; i++) {
        let size = itemSizes[i];
        let bins = container.getElementsByClassName("bin");
        let binIndex = findFirstFitBin(bins, size, binSize);

        if (binIndex === -1) {
            createNewBin(container, size, binSize);
            binIndex = bins.length - 1;
        }

        let bin = bins[binIndex];
        setTimeout(() => addItemToBin(bin, size), i * 1000);
    }
}

function runFirstFitDecreasing() {
    reset();

    let container = document.getElementById("container");
    let binSize = parseInt(document.getElementById("inputBinSize").value);
    let itemSizesInput = document.getElementById("inputItemSizes").value;
    let itemSizes = itemSizesInput.split(",").map(item => parseInt(item.trim()));

    itemSizes.sort((a, b) => b - a); // Sort items in descending order

    for (let i = 0; i < itemSizes.length; i++) {
        let size = itemSizes[i];
        let bins = container.getElementsByClassName("bin");
        let binIndex = findFirstFitBin(bins, size, binSize);

        if (binIndex === -1) {
            createNewBin(container, size, binSize);
            binIndex = bins.length - 1;
        }

        let bin = bins[binIndex];
        setTimeout(() => addItemToBin(bin, size), i * 1000);
    }
}

function reset() {
    let container = document.getElementById("container");
    container.innerHTML = "";
    binCounter = 1;
}

function createNewBin(container, size, binSize) {
    let newBin = document.createElement("div");
    newBin.className = "bin";
    newBin.style.height = binSize + "px";
    container.appendChild(newBin);

    let newText = document.createElement("div");
    newText.className = "bin-text";
    newText.textContent = "Bin " + binCounter;
    container.appendChild(newText);

    binCounter++;
}

function addItemToBin(bin, size) {
    let emptySpace = bin.offsetHeight;
    let binItems = bin.getElementsByClassName("item");

    for (let k = 0; k < binItems.length; k++) {
        emptySpace -= binItems[k].offsetHeight;
    }

    let newItem = document.createElement("div");
    newItem.className = "item";
    newItem.textContent = size;
    newItem.style.animation = "moveItem 1s ease-in-out";
    newItem.style.animationFillMode = "forwards";

    bin.appendChild(newItem);
}

function findBestFitBin(bins, size, binSize) {
    let bestFitIndex = -1;
    let bestFitSpace = Infinity;

    for (let i = 0; i < bins.length; i++) {
        let bin = bins[i];
        let emptySpace = bin.offsetHeight;
        let binItems = bin.getElementsByClassName("item");

        for (let j = 0; j < binItems.length; j++) {
            emptySpace -= binItems[j].offsetHeight;
        }

        if (emptySpace >= size && emptySpace - size < bestFitSpace && emptySpace - size >= 0) {
            bestFitSpace = emptySpace - size;
            bestFitIndex = i;
        }
    }

    return bestFitIndex;
}

function findFirstFitBin(bins, size, binSize) {
    for (let i = 0; i < bins.length; i++) {
        let bin = bins[i];
        let emptySpace = bin.offsetHeight;
        let binItems = bin.getElementsByClassName("item");

        for (let j = 0; j < binItems.length; j++) {
            emptySpace -= binItems[j].offsetHeight;
        }

        if (emptySpace >= size) {
            return i;
        }
    }

    return -1;
}
