const myTypescriptString = /*jsx*//*tsx*/`console.log(${myText})



const a = 9;;;;;;;;;;;;
;;;;;;var b = "hi";`

const myJavascriptString = /*jsx*/`console.log("hello")`

  function getLength(obj: string | string[]) {
    return obj.length;
  }

export const DEFAULT_REACT_LOADING_FILES: SandpackBundlerFiles = {
    "/App.tsx": {
      code: /*tsx*/ `console.log("hello");
      var b: number = 1+2;`,
    },
  };

  export const DEFAULT_REACT_FILES: SandpackBundlerFiles = {
    "/App.jsx": {
      code: /*tsx*/`
      import "./styles.css"
  
      export default function App() {
  
  
          return (
            <div className="flex gap-2 w-[300px] h-[400px] bg-slate-500 p-4">

            </div>  
          )
        }
        `,
    },
    [FIREJET_SAVE_DATA_PATH]: {
      //TODO: When filenames are the same it may throw errors
      code: JSON.stringify(saveFile),
    },
    "/public/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`,
    },
    "/package.json": {
      code: JSON.stringify(packageJson),
    },
  }


console.log("hi");