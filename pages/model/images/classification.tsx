import ImageCanvas from "../../../components/ImageCanvas";
import download from "../../../utils/download";
import { db } from "../../../utils/db";

export default function Classification() {
  return (
    <main>
      <h1 className="text-3xl">Use ORT Web</h1>

      <button
        onClick={handleClick}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Download Model
      </button>
      <ImageCanvas width={240} height={240} />
      <div id="result" className="mt-3"></div>
    </main>
  );
}

function handleClick() {
  (async () => {
    const model: ArrayBuffer = await download();
    await db.models.add({
      name: "squeezenet1_1",
      model: model,
    });
    console.log("download finished");
  })();
}
