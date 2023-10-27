import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/lookup-keyword/";

export default function LookupList() {
  const [keywords, setKeywords] = useState([{ id: 1, key: "", value: "" }]);
  const navigate = useNavigate();
  const location = useLocation();
  const [editingIndex, setEditingIndex] = useState(null);

  const onKeywordChange = (value, index) => {
    
    const updatedKeywords = [...keywords];
    
    if (
      updatedKeywords &&
      updatedKeywords.length &&
      index <= updatedKeywords.length - 1
    )
      updatedKeywords[index].key = value;
    setKeywords(updatedKeywords);
  };

  const onDetailsChange = (value, index) => {
    const updatedKeywords = [...keywords];
    if (
      updatedKeywords &&
      updatedKeywords.length &&
      index <= updatedKeywords.length - 1
    )
      updatedKeywords[index].value = value;
    setKeywords(updatedKeywords);
  };

  const addSection = () => {
    setKeywords([...keywords, { id: keywords.length + 1, key: "", value: "" }]);
    setEditingIndex(null);
  };

  const onBack = () => {
    navigate("/urlList");
  };

  const onSubmit = () => {
    
    if (editingIndex !== null) {
      const updatedKeyword = keywords.find((item) => item.id === editingIndex);
      const updatedData = {
        id: editingIndex,
        key: updatedKeyword.key,
        value: updatedKeyword.value,
      };

      fetch(`${API}${editingIndex}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data updated successfully:");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
     
      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keywords),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data sent successfully:");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
    navigate('/')
  };

  useEffect(() => {
    const data = location.state;
    if (data) {
      setKeywords(data);
      setEditingIndex(data[0].id);
    }
  }, [location.state]);

  return (
    <div>
      <div className="p-4 d-flex flex-column align-items-center">
        <div className="card w-75 p-2">
          <strong className="card-header">
            This is for lookup table listing
          </strong>
          {keywords.map((item, index) => (
            <div key={index}>
              <div className="mb-3 row p-2">
                <label className="col-sm-2 col-form-label">Keyword</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={item.key}
                    onChange={(e) => onKeywordChange(e.target.value, index)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                  Details (comma-separated)
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control"
                    value={item?.value}
                    rows="4"
                    onChange={(e) => onDetailsChange(e.target.value, index)}
                  />
                </div>
              </div>
              <hr />
            </div>
          ))}

          <div className="d-flex justify-content-between mb-3">
            {editingIndex === null && (
              <button className="btn btn-secondary" onClick={addSection}>
                Add More
              </button>
            )}
            <button className="btn btn-primary ml-2" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>

        <br />
        <button className="btn btn-primary" onClick={onBack}>
          Go to File list page
        </button>
        <br />
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Goto Detail Page
        </button>
      </div>
    </div>
  );
}
