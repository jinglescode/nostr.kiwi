export default function Image({
  className,
  src,
  alt = "image",
  hideIfError = false,
  generateAvatarWithChar = undefined,
}: {
  className?: string;
  src: string;
  alt?: string;
  hideIfError?: boolean;
  generateAvatarWithChar?: string;
}) {
  function generateAvatar(
    text: string,
    foregroundColor: string = "white",
    backgroundColor: string = "black"
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = 200;
      canvas.height = 200;

      // Draw background
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = "bold 100px Assistant";
      context.fillStyle = foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    return canvas.toDataURL("image/png");
  }

  function generate(e: any, char: string) {
    e.target.src = generateAvatar(char, "white", "black");
  }

  function hide(e: any) {
    e.target.style.display = "none";
  }

  let _src = src;

  if (
    (src === undefined || src.length === 0) &&
    generateAvatarWithChar !== undefined
  ) {
    _src = generateAvatar(generateAvatarWithChar, "white", "black");
  }

  return (
    <img
      slot="media"
      className={
        className
          ? className
          : "rounded-lg max-h-screen w-full object-contain my-2"
      }
      src={_src}
      onError={
        hideIfError
          ? (e) => hide(e)
          : generateAvatarWithChar
          ? (e) => generate(e, generateAvatarWithChar)
          : undefined
      }
      alt={alt}
    />
  );
}
