import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from 'jotai';
import {
  FEATURE__LOCALIZATION_MANAGER____localizationManagerList as appMessages,
  FEATURE__LOCALIZATION_MANAGER____editMessageIndex as editMessageIndex,
} from '../../stores/jotai';

function LocalizationFormPage() {
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="border flex flex-col w-[350px]">
        <label>
          Message:
          <input {...register("message", { required: true })} className="border border-black" />
        </label>
        {errors.message && <p>This field is required</p>}

        <label>
          Locale:
          <select {...register("locale", { required: true })} className="border border-black">
            <option value="">Select...</option>
            <option value="en-US">en-US</option>
            <option value="fr-FR">fr-FR</option>
            {/* Add any other locales you support */}
          </select>
        </label>
        {errors.locale && <p>This field is required</p>}

        <label>
          Tags:
          <input {...register("tags")} className="border border-black" />
        </label>

        <label>
          Payer:
          <select {...register("payer", { required: true })} className="border border-black">
            <option value="">Select...</option>
            <option value="payer1">Payer 1</option>
            <option value="payer2">Payer 2</option>
            {/* Add any other payers you support */}
          </select>
        </label>
        {errors.payer && <p>This field is required</p>}

        <input type="submit" className="border border-black" />
      </form>

      <div>
        <h2>Messages</h2>
        {messages.map((message, index) => (
          <div key={index}>
            <p>Message: {message.message}</p>
            <p>Locale: {message.locale}</p>
            <p>Tags: {message.tags}</p>
            <p>Payer: {message.payer}</p>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalizationFormPage;
