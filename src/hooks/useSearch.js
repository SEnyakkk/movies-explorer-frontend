import {useState} from 'react';

 function useSearch() {
  const [search, setSearch] = useState({text: '', isShort: false});

  function handleChange(e) {
    setSearch((data) => ({...data, text: e.target.value}))
  }

  function handleCheckboxChange(e) {
    setSearch((data) => ({...data, isShort: e.target.checked}))
  }

  return {search, setSearch, handleChange, handleCheckboxChange}
};

export default useSearch