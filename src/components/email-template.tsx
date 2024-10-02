export default function EmailTemplate({
  name,
  productKey,
}: {
  name: string | null | undefined;
  productKey: string | undefined;
}) {
  return (
    <div>
      <h1>Hey, {name?.split(" ")[0]}</h1>
      <h2>Thanks for your purchase! Here is your product key: </h2>
      <h1 className="mt-4 text-xl font-bold">{productKey}</h1>
    </div>
  );
}
