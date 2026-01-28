import React from "react";

type props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationError?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => (
  <div
    className={`bg-accent  px-4 mt-2 py-2 my-2 rounded-lg ${
      type === "error" ? "text-red-600" : "text-green-400"
    }`}
  >
    {type === "success" ? <>🎊</> : <> ⚠️</>} {content}
  </div>
);

const DisplayResponseActionResponse = ({ result }: props) => {
  const { data, serverError, validationError } = result;
  return (
    <div>
      {data?.message && (
        <MessageBox type="success" content={`Success ${data.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationError && (
        <MessageBox
          type={"error"}
          content={Object.keys(validationError).map((key) => (
            <p key={key}>{`${
              validationError[key as keyof typeof validationError]
            }`}</p>
          ))}
        />
      )}
    </div>
  );
};

export default DisplayResponseActionResponse;
