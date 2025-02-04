const CourseSelector = ({ electiveGroup }) => {
  const [selectedOrder, setSelectedOrder] = useState([]);
  
  const handleSubmit = async () => {
    try {
      await api.post('/preferences', {
        elective_group_id: electiveGroup.id,
        course_order: selectedOrder
      });
      alert('Preferences saved!');
    } catch (error) {
      alert('Error saving preferences');
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="courses">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {selectedOrder.map((courseId, index) => (
              <Draggable key={courseId} draggableId={courseId} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CourseCard courseId={courseId} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={handleSubmit}>Save Preferences</button>
    </DragDropContext>
  );
};
