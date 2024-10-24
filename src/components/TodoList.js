import React, { useState } from "react";
import { Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import "../App.css"; 
export default function TodoList() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      return setError("Please enter a task");
    }
    if (editingIndex !== null) {
      // تحديث المهمة
      const updatedTasks = tasks.map((t, index) =>
        index === editingIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // إضافة مهمة جديدة
      setTasks([...tasks, task]);
    }
    setTask("");
    setError("");
  };

  // بدء تعديل مهمة
  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  // حذف مهمة
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    await logout();
    navigate("/login"); // الانتقال إلى صفحة تسجيل الدخول
  };

  return (
    <div className="todolist-container">
      <Card className="card-custom">
        <Card.Body>
          <h2 className="text-center mb-4">Todo List</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              {editingIndex !== null ? "Update Task" : "Add Task"}
            </Button>
          </Form>
          <ListGroup className="mt-4">
            {tasks.map((t, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <span>{index + 1}. {t}</span> {/* إضافة رقم المهمة هنا */}
                <div>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* زر تسجيل الخروج تحت كلمة "Add Task" مع مسافة */}
          <div className="text-center custom-margin"> 
            <Button variant="danger" onClick={handleLogout} className="w-100">
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

// import React, { useState } from "react";
// import { Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
// import { useAuth } from "../context/AuthContext"; // استيراد سياق المصادقة
// import { useNavigate } from "react-router-dom";
// import "../App.css"; // تأكد من استيراد ملف CSS

// export default function TodoList() {
//   const { logout } = useAuth(); // استخدام logout من السياق
//   const navigate = useNavigate();
  
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);

//   // إضافة مهمة جديدة أو تحديث مهمة موجودة
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!task) {
//       return setError("Please enter a task");
//     }
//     if (editingIndex !== null) {
//       // تحديث المهمة
//       const updatedTasks = tasks.map((t, index) =>
//         index === editingIndex ? task : t
//       );
//       setTasks(updatedTasks);
//       setEditingIndex(null);
//     } else {
//       // إضافة مهمة جديدة
//       setTasks([...tasks, task]);
//     }
//     setTask("");
//     setError("");
//   };

//   // بدء تعديل مهمة
//   const handleEdit = (index) => {
//     setTask(tasks[index]);
//     setEditingIndex(index);
//   };

//   // حذف مهمة
//   const handleDelete = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   // تسجيل الخروج
//   const handleLogout = async () => {
//     await logout();
//     navigate("/login"); // الانتقال إلى صفحة تسجيل الدخول
//   };

//   return (
//     <div className="todolist-container">
//       <Card className="card-custom">
//         <Card.Body>
//           <h2 className="text-center mb-4">Todo List</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Task</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button className="w-100 mt-3" type="submit">
//               {editingIndex !== null ? "Update Task" : "Add Task"}
//             </Button>
//           </Form>
//           <ListGroup className="mt-4">
//             {tasks.map((t, index) => (
//               <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
//                 <span>{index + 1}. {t}</span>
//                 <div>
//                   <Button
//                     variant="warning"
//                     onClick={() => handleEdit(index)}
//                     className="me-2"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDelete(index)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Card.Body>
//       </Card>
//       <div className="text-center mt-3">
//         <Button variant="danger" onClick={handleLogout}>
//           Log Out
//         </Button>
//       </div>
//     </div>
//   );
// }
