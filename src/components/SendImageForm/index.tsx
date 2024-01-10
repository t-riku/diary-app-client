import { ImageInput } from "../ImageInput";
import { useSendImageForm, IMAGE_ID } from "./useSendImageForm.ts";
import styles from "../../styles/DeleteBtn.module.css";

export const SendImageForm: React.FC = () => {
  const {
    FIELD_SIZE,
    fileName,
    imageSource,
    fileInputRef,
    errors,
    rest,
    ref,
    onSubmit,
    handleSubmit,
    handleClickCancelButton,
    selectFile,
  } = useSendImageForm();

  return (
    <form
      className="flex flex-col gap-[10px] items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`border-black border-[3px] border-dotted w-[${FIELD_SIZE}px] h-[${FIELD_SIZE}px] w-[210px] h-[210px] flex items-center justify-center rounded-[12px] overflow-hidden cursor-pointer`}
        onClick={selectFile}
        role="presentation"
      >
        {fileName ? (
          <img
            src={imageSource}
            alt="アップロード画像"
            className="w-full h-full object-cover"
          />
        ) : (
          "+ 画像をアップロード"
        )}

        {/* ダミーインプット: 見えない */}
        <ImageInput
          fileInputRef={fileInputRef}
          refCallback={ref}
          id={IMAGE_ID}
          {...rest}
        />
      </div>
      <span className="text-red-600 text-xs">
        {errors?.message?.toString()}
      </span>

      {/* キャンセルボタン */}
      <div className="flex gap-[12]">
        <button onClick={handleClickCancelButton} className={styles.noselect}>
          <span className={styles.text}>キャンセル</span>
          <span className={styles.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>

        {/* <button type="submit">画像を送信</button> */}
      </div>
    </form>
  );
};
