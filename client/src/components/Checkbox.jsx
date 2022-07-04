const Checkbox = ({ name,change }) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value={name}
          className="w-6 h-6 text-blue-50 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
          onChange={change}
        />
        <label
          htmlFor="default-checkbox"
          className="ml-1 text-2xl font-medium text-gray-900 "
        >
          {name}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
