export default async function download() {
  const response = await fetch(
    "https://onnx-model.cclin.org/squeezenet1_1.onnx"
  );
  return response.arrayBuffer();
}
