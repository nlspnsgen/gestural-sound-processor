import { exec } from 'child_process';

const startProcessing = () => {
  exec('%processing% --sketch="C:/Users/Poensgen/Desktop/gestural-sound-processor/src/gui" --output="C:/Users/Poensgen/Desktop/gestural-sound-processor/src/gui/output" --force --run',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
};

startProcessing();
