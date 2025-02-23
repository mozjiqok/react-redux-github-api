interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
}

export function Alert({ message, type }: AlertProps) {
  let bgColor, textColor;

  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    case "info":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
  }

  return (
    <div className={`p-4 mb-4 rounded-md ${bgColor} ${textColor}`}>
      <p>{message}</p>
    </div>
  );
}
