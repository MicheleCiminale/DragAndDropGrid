import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import uuid from "react-uuid"
import BoxSettings from "./BoxSettings";

import {copy,incrementIndex, lengthContex} from "./operationDragAndDrop/Operation";
import ITEMS from "./menuElement/ArrayItems";
import {Content, Item, Clone, Handle, Kiosk, Container, Notice, WidgetTitle} from "./styles/Styles"

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayout = () =>{

  const [showModal, setShowModal] = useState(false);
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([{
          w: {i: "1", x: 0, y: 0, w: 2, h: 2},
          c: {[uuid()]: []}
      }]);
  const [lastItem, setLastItem] = useState(null);

  const handleModify = (layouts, layout) => {
      const tempArray = widgetArray;
        setLayouts(layout);
        layouts?.map((position) => {
            tempArray[Number(position.i)].x = position.x;
            tempArray[Number(position.i)].y = position.y;
            tempArray[Number(position.i)].width = position.w;
            tempArray[Number(position.i)].height = position.h;
        });
        setWidgetArray(tempArray);
  };

  const handleAdd = () => {
        setWidgetArray([
            ...widgetArray,
            {
                w : {i: incrementIndex(widgetArray), x: 0, y: 0, w: 2, h: 2},
                c : {[uuid()]: []}
            }
        ]);
    };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.w.i === key));
    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
  };


  function newState(status){

      let lastArray;

      if(status.state === "approved"){
          setShowModal(false)
      }else{
          lastArray = widgetArray.map(element=>element)[0].c;
          let newArray = Object.values(lastArray)[0];
          let indexArray = newArray.findIndex(x=>x.id === lastItem);
          newArray.splice(indexArray,1)
          setShowModal(false)
      }
  }

  const onDragEnd = result => {
      debugger
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if(lengthContex(widgetArray)){
            alert("Il widget ha una grandezza massima di 6 elementi");
            return;
        }

        let newUUIDToAdd = uuid()

        if(source.droppableId === 'ITEMS') {
            setWidgetArray(prevState=> {
                let arr = Array.from(prevState);
                arr.map((element) => {

                    if(element.c[destination.droppableId] !== undefined){
                        element.c[destination.droppableId] = copy(
                            ITEMS,
                            element.c[destination.droppableId],
                            source,
                            destination,
                            newUUIDToAdd
                        )}
                    return element;
                });
                return arr;
            });
        }

        setLastItem(newUUIDToAdd)
        setShowModal(true)
    };

  return (
    <div>
        <DragDropContext onDragEnd={onDragEnd}>
            <BoxSettings show={showModal} handleOk={newState} handleCancel={newState}/>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </Kiosk>
                    )}
                </Droppable>
                <button onClick={() => handleAdd()}>Add Widget</button>
                <ResponsiveReactGridLayout
                    onLayoutChange={handleModify}
                    verticalCompact={true}
                    layout={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    preventCollision={false}
                    cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 2 }}
                    autoSize={true}
                    style={{width:"88%"}}
                    margin={{
                        lg: [20, 20],
                        md: [20, 20],
                        sm: [20, 20],
                        xs: [20, 20],
                        xxs: [20, 20],
                    }}
                >
                {widgetArray?.map((widget, index) => {
                    return (
                        <div
                            className="reactGridItem"
                            key={index}
                            data-grid={{
                                x: widget?.w.x,
                                y: widget?.w.y,
                                w: widget?.w.w,
                                h: widget?.w.h,
                                i: widget.w.i,
                                minW: 2,
                                maxW: Infinity,
                                minH: 2,
                                maxH: Infinity,
                                isDraggable: true,
                                isResizable: true,
                            }}
                        >
                            <button
                                className="deleteButton"
                                onClick={() => handleDelete(widget.w.i)}
                            >
                                x
                            </button>
                            <WidgetTitle>{"widget" + widget.w.i}</WidgetTitle>
                            <Content>
                                {Object.keys(widget.c).map((element, i)=> {
                                    return(
                                        <Droppable key={element} droppableId={element}>
                                        {(provided, snapshot) => (

                                            <Container
                                                ref={provided.innerRef}
                                                isDraggingOver={
                                                    snapshot.isDraggingOver
                                                }>
                                                {widget.c[element].length ?
                                                    widget.c[element].map(
                                                        (item, index) =>(
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <Item
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        isDragging={snapshot.isDragging}>
                                                                        {
                                                                            (item.hasOwnProperty("component")) ? item.component(lastItem) : item.content
                                                                        }
                                                                    </Item>
                                                                )}
                                                            </Draggable>
                                                            )
                                                    )
                                                     : !provided.placeholder && (
                                                         <Notice>
                                                            Drop items here
                                                        </Notice>
                                                    )}
                                                {provided.placeholder}
                                            </Container>
                                        )}
                                    </Droppable>
                                    )})}
                            </Content>
                        </div>
                    );
                })}
            </ResponsiveReactGridLayout>
        </DragDropContext>
    </div>
  );
};

export default ReactGridLayout;
