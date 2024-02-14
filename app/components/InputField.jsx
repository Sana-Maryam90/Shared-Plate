"use client";

export default function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  setter,
  required,
  min,
  max,
  mt,
  mb,
}) {
  return (
    <div className={`w-full inline-block mb-${mb}`}>
      <label htmlFor={id} className="block text-xl font-notosans font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder || ""}
        value={value}
        min={min || ""}
        max={max || ""}
        onChange={(e) => setter(e.target.value)}
        required={required}
        className={`mt-${mt} block w-full py-2 bg-transparent border-b-4 border-black font-notosans text-base shadow-sm placeholder-slate-400
                focus:outline-none focus:border-green invalid:border-red invalid:text-red focus:invalid:border-red`}
      />
    </div>
  );
}
