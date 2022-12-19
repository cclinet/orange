import { useRef, useState } from "react";
import { IMAGE_URLS } from "../data/sample-image-urls";
import { inferenceSqueezenet } from "../utils/predict";

interface Props {
  height: number;
  width: number;
}

const ImageCanvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let image: HTMLImageElement;
  const [topResultLabel, setLabel] = useState("");
  const [topResultConfidence, setConfidence] = useState("");
  const [inferenceTime, setInferenceTime] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // Load the image from the IMAGE_URLS array
  const getImage = () => {
    const sampleImageUrls: Array<{ text: string; value: string }> = IMAGE_URLS;
    const random = Math.floor(Math.random() * (9 + 1));
    return sampleImageUrls[random];
  };

  // Draw image and other  UI elements then run inference
  const displayImageAndRunInference = () => {
    // Get the image
    image = new Image();
    const sampleImage = getImage();
    image.src = sampleImage.value;

    // Clear out previous values.
    setLabel(`Inferencing...`);
    setConfidence("");
    setInferenceTime("");

    // Draw the image on the canvas
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, props.width, props.height);
    };

    // Run the inference
    submitInference().then();
  };

  const submitInference = async () => {
    // Get the image data from the canvas and submit inference.
    const [inferenceResult, inferenceTime] = await inferenceSqueezenet(
      image.src
    );

    // Get the highest confidence.
    const topResult = inferenceResult[0];

    // Update the label and confidence
    setLabel(topResult.name.toUpperCase());
    setConfidence(topResult.probability);
    setInferenceTime(`Inference speed: ${inferenceTime} seconds`);
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">


        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file"
                 className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={event => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);}
            }/>
          </label>
        </div>

        <canvas ref={canvasRef} width={props.width} height={props.height} />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {topResultLabel} {topResultConfidence}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {" "}
            {inferenceTime}
          </p>
          <button
            onClick={displayImageAndRunInference}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Run Squeezenet inference
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCanvas;
