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
