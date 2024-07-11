"use client";

import { useState } from "react";
import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import Image from "@/components/image";
import { Card, CardContent } from "@/components/ui/card";
import { FileWithPreview } from "@/types/file";
import { fileToBase64 } from "@/lib/utils";
import { ApiModelResult } from "@/types/file";


export function Dropzone({ onResultApiReceived }) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isHaveFile, setHaveFile] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const newFile: FileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        setFile(newFile);
        setHaveFile(true);

        try {
          const image_base64 = await fileToBase64(newFile);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_MODEL_URL}/predict`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image_base64: image_base64,
              }),
            }
          );

          const result = await response.json();
          onResultApiReceived(result);

        } catch (error) {
          console.log("Error fetching api: ", error);
        }
      }
    },
    [onResultApiReceived]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  } as DropzoneOptions);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-1 gap-4 max-w-full mx-auto">
        <Card>
          <CardContent>
            <div
              {...getRootProps({
                style: {
                  width: 550,
                  height: 550,
                },
              })}
            >
              <input {...getInputProps()} />
              {isHaveFile ? (
                file && (
                  <>
                    <Image
                      src={file.preview}
                      alt=""
                      width={800}
                      height={400}
                      rounded="rounded"
                      className="lg:hover:scale-105 h-[545px] flex-1 relative max-w-full overflow-hidden object-cover "
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-50 bg-slate-900 bg-opacity-60">
                      <div className="space-y-4 text-center">
                        <div className="flex items-center justify-center">
                          <LoadingCircle />
                        </div>
                        <p className="text-sm font-medium text-slate-100">
                          Mendapatkan Hasil ...
                        </p>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="mt-40 flex flex-col items-center justify-center w-full h-64 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isDragActive ? (
                        <p className="mb-2 text-sm text-gray-100 dark:text-gray-400">
                          Drop citra disini ...
                        </p>
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-slate-900 dark:text-gray-400">
                            <span className="font-semibold">
                              Klik untuk mengupload
                            </span>{" "}
                            atau drop gambar disini
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dropzone;

const LoadingCircle = () => {
  return (
    <svg
      className="h-8 w-8 animate-spin text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.75V6.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1924 6.8076L16.0674 7.9326"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 12H17.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1924 17.1924L16.0674 16.0674"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.75V19.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.8076 17.1924L7.9326 16.0674"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 12H6.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.8076 6.8076L7.9326 7.9326"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
