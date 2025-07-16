import style from "../../stylesheets/CreatingPage.module.css";
import { useState } from "react";
import apiCall from "../../utils/API";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, field, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const styleItem = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={styleItem} className={style.field}>
      <img
        {...attributes}
        {...listeners}
        src="https://img.icons8.com/?size=100&id=94600&format=png&color=000000"
        alt="drag-icon"
        style={{ cursor: "grab" }}
      />
      <input type={field.type} value={field.title} readOnly />

      <img
        onClick={onEdit}
        src="https://img.icons8.com/?size=100&id=20388&format=png&color=000000"
        alt="edit-icon"
      />

      <img
        onClick={onDelete}
        src="https://img.icons8.com/?size=100&id=8329&format=png&color=000000"
        alt="delete-icon"
      />
    </div>
  );
};

const CreatingPage = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [addSectionTitle, setAddSectionTitle] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [fields, setFields] = useState([
    { type: "text", title: "Edit your title here" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(active.id);
    const newIndex = parseInt(over.id);

    const reordered = arrayMove(fields.slice(1), oldIndex, newIndex);
    setFields([fields[0], ...reordered]);
  };

  const handleAddButton = (value) => {
    const newField = {
      type: value,
      title: ``,
      placeholder: ``,
    };
    if (addSectionTitle) {
      newField.sectionTitle = "Section Title";
    }
    setFields([...fields, newField]);
  };

  const handleEdit = (index) => {
    setCurrentField(index);
  };

  const handleDelete = (index) => {
    fields.splice(index, 1);
    setFields([...fields]);
  };

  const handlleTitleOnChange = (e) => {
    fields[currentField].title = e.target.value;
    setFields([...fields]);
  };

  const handllePlaceholderOnChange = (e) => {
    fields[currentField].placeholder = e.target.value;
    setFields([...fields]);
  };

  const handleSectionTitleOnChange = (e) => {
    if (fields[currentField]) {
      fields[currentField].sectionTitle = e.target.value;
      setFields([...fields]);
    }
  };

  const handleCreateForm = () => {
    const body = {
      title: fields[0].title,
      fields: fields.slice(1),
    };
    const getHomeDetails = async () => {
      await apiCall(`${BACKEND_URL}/api/forms/create`, "POST", body);
      navigate("/");
    };
    getHomeDetails();
  };

  return (
    <div className={style.mainContainer}>
      <h1>Create New Form</h1>
      <div className={style.container}>
        <div className={style.addContainer}>
          <div className={style.titleContainer}>
            <h1>{fields[0].title}</h1>
            <img
              onClick={() => handleEdit(0)}
              src="https://img.icons8.com/?size=100&id=20388&format=png&color=000000"
              alt="edit-icon"
            />
          </div>
          <div className={style.fieldContainer}>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.slice(1).map((_, i) => i.toString())}
                strategy={verticalListSortingStrategy}
              >
                <div className={style.fieldLayout}>
                  {fields.slice(1).map((field, index) => (
                    <SortableItem
                      key={index}
                      id={index.toString()}
                      field={field}
                      onEdit={() => handleEdit(index + 1)}
                      onDelete={() => handleDelete(index + 1)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className={style.addInputContainer}>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addSectionTitle}
                    onChange={() => setAddSectionTitle(!addSectionTitle)}
                  />{" "}
                  Add Section Title
                </label>
              </div>
              {showInput ? (
                <div>
                  <button
                    className={style.actionBtn}
                    onClick={() => setShowInput(false)}
                  >
                    CLOSE ADD INPUT
                  </button>
                  <div className={style.buttonContainer}>
                    {["text", "number", "email", "password", "date"].map(
                      (type) => (
                        <div
                          key={type}
                          className={style.addBtn}
                          onClick={() => handleAddButton(type)}
                        >
                          {type.toUpperCase()}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <button
                  className={style.actionBtn}
                  onClick={() => setShowInput(true)}
                >
                  ADD INPUT
                </button>
              )}
              <br />
              <button className={style.submitBtn}>Submit</button>
            </div>
          </div>
        </div>
        <div className={style.formEditor}>
          <h1>Form Editor</h1>
          <label>Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter Title"
            onChange={handlleTitleOnChange}
            value={fields?.[currentField]?.title}
            required
          />
          <br />
          <label>Placeholder</label>
          <br />
          <input
            type="text"
            placeholder="Enter Placeholder"
            onChange={handllePlaceholderOnChange}
            value={fields?.[currentField]?.placeholder}
            required
          />
          <br />
          {fields?.[currentField]?.sectionTitle !== undefined && (
            <>
              <label>Section Title</label>
              <br />
              <input
                type="text"
                placeholder="Enter Section Title"
                onChange={handleSectionTitleOnChange}
                value={fields?.[currentField]?.sectionTitle}
              />
            </>
          )}
        </div>
      </div>
      <button className={style.createBtn} onClick={handleCreateForm}>
        CREATE FORM
      </button>
    </div>
  );
};

export default CreatingPage;
