'use client';

/**
  Designed to sit within the following layout:
  
  <div className="space-y-10 divide-y divide-gray-900/10">
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      ...
    </div>
  </div>
 */
import { Fragment, useCallback, useState } from "react"
import { useForm } from "react-hook-form";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import clsx from "clsx";
import { useAtom } from "jotai";
import { notifications } from "../../stores/jotai";
import { newNotification } from "../Notifications";
import { useUser } from "@auth0/nextjs-auth0/client";

const ProfileSettingsProfileForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [appNotifications, setAppNotifications] = useAtom(notifications);
  const { user } = useUser();

  const onSubmit = data => {
    setAppNotifications([...appNotifications, newNotification({
      title: 'Profile updated',
      message: 'Your profile has been updated successfully.',
      type: 'success',
      authorId: user.sub,
      log: {
        scope: 'user:profile',
        action: 'update'
      }
    })]);
  }

  const onCancel = () => {
    reset();
    setPreviewImage(null);
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif', // accepts only JPEG, PNG and GIF
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  const dropzoneClasses = clsx(
    'flex justify-center rounded-lg',
    {
      'border-gray-900/25': !isDragActive,
      'border-indigo-500 hover:border-indigo-700': isDragActive,
    },
    !previewImage ? 'border border-dashed px-6 py-10' : 'h-[190px]'
  );

  return (
    <Fragment>
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span>
                  <input
                    {...register("username")}
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="t-hanks"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  {...register("about")}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {photo ? (
                  <img src={photo} alt="User selected" className="h-12 w-12 rounded-full" />
                ) : (
                  <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <input
                  {...register("photo")}
                  onChange={handlePhotoChange}
                  type="file"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div
                className={dropzoneClasses}
                {...getRootProps()}
              >
                <input
                  {...getInputProps()}
                  {...register("coverPhoto")}
                  type="file"
                  className="sr-only"
                />
                <div className="text-center">
                  {previewImage ? (
                    <div
                      className="h-[190px] w-full bg-cover"
                      style={{
                        backgroundImage: `url(${previewImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className={clsx("mt-4 flex text-sm leading-6 text-gray-600", isDragActive && 'items-center')}>
                        <label
                          htmlFor="file-upload"
                          className="text-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>{isDragActive ? 'Drop file here' : 'Upload a file'}</span>
                        </label>
                        {!isDragActive && <p className="pl-1">or drag and drop</p>}
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Fragment>
  )
}

export default ProfileSettingsProfileForm;