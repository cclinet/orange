import ImageCanvas from "../../../components/ImageCanvas";
import download from "../../../utils/download";
import {db} from "../../../utils/db";

export default function Classification() {
  return (
    <main>
      <h1 className="text-3xl">Use ORT Web</h1>

      <button onClick={handleClick}>Download</button>

      <ImageCanvas width={240} height={240}/>
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
