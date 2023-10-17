import Button from './Button';

const SidebarItem = ({ icon, text, onClick, isExpanded }) => (
  <li className="flex items-center justify-between w-full">
    {isExpanded ? (
      <Button
        onClick={onClick}
        className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-slate-800 hover:bg-slate-700 text-yellow-600 font-bold"
      >
        {text}
      </Button>
    ) : (
      <div className="inline-block text-yellow-600 rounded-full">{icon}</div>
    )}
  </li>
);

export default SidebarItem;
