import React, { useState, useEffect } from 'react';

const App = () => {
  const [locales, setLocales] = useState([]);
  const [newLocale, setNewLocale] = useState({});
  const [editedLocale, setEditedLocale] = useState({});
  const [deletedLocale, setDeletedLocale] = useState({});

  useEffect(() => {
    fetchLocales();
  }, []);

  const fetchLocales = async () => {
    try {
      const response = await fetch('/api/v1/locales');
      const data = await response.json();
      setLocales(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createLocale = async () => {
    try {
      const response = await fetch('/api/v1/locales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocale),
      });
      const data = await response.json();
      setLocales([...locales, data.data]);
      setNewLocale({});
    } catch (error) {
      console.error(error);
    }
  };

  const updateLocale = async (id) => {
    try {
      const response = await fetch(`/api/v1/locales/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedLocale),
      });
      const data = await response.json();
      const updatedLocales = locales.map((locale) =>
        locale.id === id ? data.data : locale
      );
      setLocales(updatedLocales);
      setEditedLocale({});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocale = async (id) => {
    try {
      const response = await fetch(`/api/v1/locales/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      const filteredLocales = locales.filter((locale) => locale.id !== id);
      setLocales(filteredLocales);
      setDeletedLocale(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Locales</h1>
      <div>
        <h2>Get Locales</h2>
        <button onClick={fetchLocales}>Fetch Locales</button>
        <ul>
          {locales.map((locale) => (
            <li key={locale.id}>{locale.locale}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create Locale</h2>
        <input
          type="text"
          placeholder="Locale"
          value={newLocale.locale || ''}
          onChange={(e) =>
            setNewLocale({ ...newLocale, locale: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Message"
          value={newLocale.message || ''}
          onChange={(e) =>
            setNewLocale({ ...newLocale, message: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Message Key"
          value={newLocale.message_key || ''}
          onChange={(e) =>
            setNewLocale({ ...newLocale, message_key: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Screen ID"
          value={newLocale.screen_id || ''}
          onChange={(e) =>
            setNewLocale({ ...newLocale, screen_id: e.target.value })
          }
        />
        <button onClick={createLocale}>Create Locale</button>
      </div>
      <div>
        <h2>Edit Locale</h2>
        {locales.map((locale) => (
          <div key={locale.id}>
            <input
              type="text"
              placeholder="Locale"
              value={editedLocale.locale || locale.locale}
              onChange={(e) =>
                setEditedLocale({ ...editedLocale, locale: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Message"
              value={editedLocale.message || locale.message}
              onChange={(e) =>
                setEditedLocale({ ...editedLocale, message: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Message Key"
              value={editedLocale.message_key || locale.message_key}
              onChange={(e) =>
                setEditedLocale({ ...editedLocale, message_key: e.target.value })
              }
            />
            <button onClick={() => updateLocale(locale.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Delete Locale</h2>
        {locales.map((locale) => (
          <div key={locale.id}>
            <span>{locale.locale}</span>
            <button onClick={() => deleteLocale(locale.id)}>Delete</button>
          </div>
        ))}
        {deletedLocale && (
          <p>Deleted Locale: {deletedLocale.locale}</p>
        )}
      </div>
    </div>
  );
};

export default App;
