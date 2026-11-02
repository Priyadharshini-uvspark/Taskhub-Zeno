
import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

function App() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  function addToast() {
    const newToast = {
      id: Date.now(),
      message: "Operation successful!"
    };

    setToasts((prev) => [...prev, newToast]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>React UI Kit</h1>

      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Loading</Button>

      <h2>Input</h2>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        error={!name ? "Name is required" : ""}
      />

      <h2>Modal</h2>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello!</h2>
        <p>This is our reusable modal.</p>
      </Modal>

      <h2>Toast</h2>
      <Button onClick={addToast}>Show Toast</Button>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;

// import { useState } from "react";
// import Button from "./components/Button";
// import Input from "./components/Input";
// import Modal from "./components/Modal";

// function App() {
//   const [name, setName] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h1>React UI Kit</h1>

//       <Button>Primary</Button>
//       <Button variant="secondary">Secondary</Button>
//       <Button variant="danger">Danger</Button>
//       <Button loading>Loading</Button>

//       <h2>Input Component</h2>

//       <Input
//         label="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//         error={!name ? "Name is required" : ""}
//       />

//       <h2>Modal Component</h2>

//       <Button onClick={() => setIsOpen(true)}>
//         Open Modal
//       </Button>

//       <Modal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//       >
//         <h2>Hello!</h2>
//         <p>This is our reusable modal.</p>
//       </Modal>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import Button from "./components/Button";
// import Input from "./components/Input";

// function App() {
//   const [name, setName] = useState("");

//   return (
//     <div style={{ padding: "30px" }}>
//       <h1>React UI Kit</h1>

//       <Button>Primary</Button>
//       <Button variant="secondary">Secondary</Button>
//       <Button variant="danger">Danger</Button>
//       <Button loading>Loading</Button>

//       <h2>Input Component</h2>

//       <Input
//         label="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//         error={name.length === 0 ? "Name is required" : ""}
//       />
//     </div>
//   );
// }

// export default App;


// import Button from "./components/Button";

// function App() {
//   return (
//     <div style={{ padding: "30px" }}>
//       <h1>React UI Kit</h1>

//       <Button>Primary Button</Button>{" "}
//       <Button variant="secondary">Secondary Button</Button>{" "}
//       <Button variant="danger">Danger Button</Button>{" "}
//       <Button loading>Loading Button</Button>
//     </div>
//   );
// }

// export default App;



// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
