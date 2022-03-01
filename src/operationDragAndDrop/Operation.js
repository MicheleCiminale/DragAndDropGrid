const copy = (source, destination, droppableSource, droppableDestination, uuid) => {
    console.log('==> dest', destination);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id : uuid});
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const incrementIndex = (array) => {
    if(array.length > 0){
        return ((parseInt(array[array.length-1].w.i))+1).toString();
    }
    else{
        return "1"
    }
}

const lengthContex = (widgetArray)=> {
    return Object.values(widgetArray[0].c)[0].length === 6
}


export {
    copy,
    move,
    reorder,
    incrementIndex,
    lengthContex
}
