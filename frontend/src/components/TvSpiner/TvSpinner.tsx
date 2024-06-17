export const Spinner = () => (
  <div className='flex space-x-2 justify-center items-center'>
    <div className='h-3 w-3 bg-backgroundSecondary rounded-full custom-animate-bounce' style={{ animationDelay: "-0.3s" }}></div>
    <div className='h-3 w-3 bg-backgroundSecondary rounded-full custom-animate-bounce' style={{ animationDelay: "-0.15s" }}></div>
    <div className='h-3 w-3 bg-backgroundSecondary rounded-full custom-animate-bounce'></div>
  </div>
);
