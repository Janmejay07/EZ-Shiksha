import {spawn} from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const Solve=(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const imagePath = req.file.path;
        const pythonScriptPath = path.join(__dirname, 'maths.py');

        let responseData = '';
        let errorData = '';

        // Try python3 first, then python
        const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
        
        const childPython = spawn(pythonCommand, [pythonScriptPath, imagePath], {
            cwd: __dirname
        });

        childPython.stdout.on('data',(data)=>{
            responseData += data.toString();
        });

        childPython.stderr.on('data',(data)=>{
            errorData += data.toString();
            console.error(`Python stderr: ${data}`);
        });

        childPython.on('error',(error)=>{
            console.error(`Failed to start Python process: ${error.message}`);
            return res.status(500).json({ error: `Python process failed: ${error.message}` });
        });

        childPython.on('close',(code)=>{
            console.log(`Python process exited with code ${code}`);
            
            if (code !== 0) {
                console.error(`Python script failed with code ${code}`);
                return res.status(500).json({ 
                    error: "Math solving failed", 
                    details: errorData || "Unknown error" 
                });
            }

            if (!responseData || responseData.trim() === '') {
                return res.status(500).json({ error: "No solution received from Python script" });
            }

            res.json({ trying: responseData.trim() });
        });
    } catch (error) {
        console.error(`Error in Solve handler: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}

export default Solve

