import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from 'jotai';
import {
  FEATURE__LOCALIZATION_MANAGER____localizationManagerList as appMessages,
  FEATURE__LOCALIZATION_MANAGER____editMessageIndex as editMessageIndex,
} from '../../stores/jotai';
import Editor from '@monaco-editor/react';

function AddNewMessage() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [messages, setMessages] = useAtom(appMessages);
  const [editIndex, setEditIndex] = useAtom(editMessageIndex);

  const onSubmit = data => {
    if (editIndex !== null) {
      setMessages(oldMessages => {
        const updatedMessages = [...oldMessages];
        updatedMessages[editIndex] = data;
        return updatedMessages;
      });
      setEditIndex(null);
      reset();
    } else {
      setMessages(oldMessages => [...oldMessages, data]);
      reset();
    }
  }

  const onEdit = index => {
    const message = messages[index];
    setValue('message', message.message);
    setValue('locale', message.locale);
    setValue('tags', message.tags);
    setValue('payer', message.payer);
    setEditIndex(index);
  }

  const onDelete = index => {
    setMessages(oldMessages => oldMessages.filter((_, i) => i !== index));
    if (editIndex === index) {
      reset();
      setEditIndex(null);
    }
  }

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  const editorOptions = {
    suggestOnTriggerCharacters: false, // Disable popup suggestions
    minimap: {
      enabled: false // Remove the mirror (minimap)
    }
  };


  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Message</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus eligendi delectus,
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Payer
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>001</option>
                    <option>002</option>
                    <option>003</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="locale" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Locale
                </label>
                <div className="mt-2">
                  <select
                    id="locale"
                    name="locale"
                    autoComplete="locale-name"

                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={'english'}>English</option>
                    <option value={'french'}>French</option>
                    <option value={'spanish'}>Spanish</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Localized Message
                </label>
                <div className="mt-2">
                  <div className="block w-full rounded-md border-0 p-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <Editor
                      height="100px"
                      defaultLanguage="handlebars"
                      defaultValue="// some comment"
                      onMount={handleEditorDidMount}
                      editorOptions={{
                        minimap: {
                          autohide: true
                        }
                      }}
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">We support basic localization syntax for dynamic variables and HTML.</p>
              </div>


              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Message ID
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 text-sm border rounded-l">
                      global-
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="adsawe"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Tags
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">Add multiple via comma separated values</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
    </div>
  );
}

export default AddNewMessage;