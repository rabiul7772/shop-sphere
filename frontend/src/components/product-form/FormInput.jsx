const FormInput = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="form-control w-full">
      <label className="label mb-1">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
          <Icon className="size-5" />
        </div>
        <input
          {...props}
          className="input input-bordered w-full pl-10 focus:input-primary transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default FormInput;
