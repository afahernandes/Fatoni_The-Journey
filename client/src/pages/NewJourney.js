import React from "react";
import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { API } from "../config/api";
import attach from "../assets/Vectorattach.svg";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

function NewJourney() {
  const history = useHistory();
  const [preview, setPreview] = useState(null); //For image preview
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [form, setForm] = useState({
    description: "",
    title: "",
  });
  console.log("Preview", preview);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("description", JSON.stringify(rawContentState));
      formData.set("image", preview);

      console.log(form);

      const response = await API.post("/journey", formData, config);
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="textHeader">New Journey</h3>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="formGroup" controlId="title">
            <Form.Label className="fromLabel">
              <h5>Title</h5>
            </Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} type="text" name="title" />
          </Form.Group>

          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            wrapperStyle={{
              marginBottom: "20px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            editorStyle={{ height: "300px", padding: "10px" }}
          />
          <Form.Group className="formInputImage mb-3 mt-3" controlId="ImageUpload">
            <Form.Label className="d-flex justify-content-between">
              <span style={{ color: "#8c8b8b" }}>{preview ? preview.name : "Upload Fle"}</span>
              <Form.Control
                name="image"
                onChange={(e) => {
                  setPreview(e.target.files[0]);
                  // setImage(e.target.files[0].name);
                }}
                type="file"
                hidden
              />
              <Image src={attach} style={{ width: "14px" }} />
            </Form.Label>
          </Form.Group>
          <div className="d-flex  flex-row-reverse">
            <Button className="buttonPost" type="submit">
              Post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default NewJourney;
