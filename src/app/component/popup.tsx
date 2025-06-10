interface PopupProps {
  heading?: string;
  subheading?: string;
  firstButtonText?: string;
  secondButtonText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}
export default function Popup({
  heading,
  subheading,
  firstButtonText,
  secondButtonText,
  onClose,
  onSubmit,
}: PopupProps) {
  return (
    <div className="fixed inset-0  text-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className=" bg-white px-5 py-5 rounded-2xl w-full  max-w-md mx-4">
        <div className="my-1 font-semibold">{heading}</div>
        <div className="text-sm text-gray-500">{subheading}</div>
        <div className=" pt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="py-1 px-2   rouned-md bg-gray-100"
          >
            {firstButtonText}
          </button>
          <button
            onClick={onSubmit}
            className="py-1 px-2 text-white rounded-md bg-sky-600"
          >
            {secondButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
