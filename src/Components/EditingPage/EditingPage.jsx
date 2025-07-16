import style from "../../stylesheets/EditingPage.module.css";
import { useState, useEffect } from "react";
import apiCall from "../../utils/API";
import { useNavigate, useParams } from "react-router-dom";

const EditingPage = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [fields, setFields] = useState([{}]);
  const { id } = useParams();
  const getFormDetails = async () => {
    const response = await apiCall(`${BACKEND_URL}/api/forms/V2/${id}`, "GET");
    setFields(response);
  };

  useEffect(() => {
    getFormDetails();
  }, []);

  const handleAddButton = (value) => {
    fields.push({ type: value, title: ``, placeholder: `` });
    setFields([...fields]);
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

  const handleCreateForm = () => {
    const body = {
      title: fields[0].title,
      fields: fields.slice(1),
    };
    const getHomeDetails = async () => {
      const response = await apiCall(
        `${BACKEND_URL}/api/forms/edit/${id}`,
        "POST",
        body
      );
      navigate("/");
    };
    getHomeDetails();
  };

  return (
    <div className={style.mainContainer}>
      <h1>Edit Form</h1>
      <div className={style.container}>
        <div className={style.addContainer}>
          <div className={style.titleContainer}>
            <h1>{fields[0]?.title}</h1>
            <img
              onClick={() => handleEdit(0)}
              src="https://img.icons8.com/?size=100&id=20388&format=png&color=000000"
              alt="edit-icon"
            />
          </div>
          <div className={style.fieldContainer}>
            <div className={style.fieldLayout}>
              {fields?.map((field, index) => {
                if (index != 0) {
                  return (
                    <div className={style.field} key={index}>
                      <input
                        type={field.type}
                        name=""
                        id=""
                        value={field.title}
                      />
                      <img
                        onClick={() => handleEdit(index)}
                        src="https://img.icons8.com/?size=100&id=20388&format=png&color=000000"
                        alt="edit-icon"
                      />
                      <img
                        onClick={() => handleDelete(index)}
                        src="https://img.icons8.com/?size=100&id=8329&format=png&color=000000"
                        alt="delete-icon"
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className={style.addInputContainer}>
              {showInput ? (
                <div>
                  <button
                    className={style.actionBtn}
                    onClick={() => setShowInput(false)}
                  >
                    {" "}
                    CLOSE ADD INPUT
                  </button>
                  <div className={style.buttonContainer}>
                    <div
                      className={style.addBtn}
                      onClick={() => {
                        handleAddButton("text");
                      }}
                    >
                      TEXT
                    </div>
                    <div
                      className={style.addBtn}
                      onClick={() => {
                        handleAddButton("number");
                      }}
                    >
                      NUMBER
                    </div>
                    <div
                      className={style.addBtn}
                      onClick={() => {
                        handleAddButton("email");
                      }}
                    >
                      EMAIL
                    </div>
                    <div
                      className={style.addBtn}
                      onClick={() => {
                        handleAddButton("password");
                      }}
                    >
                      PASSWORD
                    </div>
                    <div
                      className={style.addBtn}
                      onClick={() => {
                        handleAddButton("date");
                      }}
                    >
                      DATE
                    </div>
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
              <button className={style.submitBtn}>Sumit</button>
            </div>
          </div>
        </div>
        <div className={style.formEditor}>
          <h1>Form Editor</h1>
          <label htmlFor="">Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter Title"
            onChange={handlleTitleOnChange}
            value={fields?.[currentField]?.title}
            required
          />
          <br />
          <label htmlFor="">Placeholder</label>
          <br />
          <input
            type="text"
            placeholder="Enter Placeholder"
            onChange={handllePlaceholderOnChange}
            value={fields?.[currentField]?.placeholder}
            required
          />
        </div>
      </div>

      <button className={style.createBtn} onClick={handleCreateForm}>
        SAVE FORM
      </button>
    </div>
  );
};

export default EditingPage;
