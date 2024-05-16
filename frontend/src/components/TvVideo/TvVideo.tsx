const TvVideo = ({ videoLink, title }: { videoLink: string, title?: string }) => {
  return (
    <div className="px-[30px] sm:px-[60px] xl:px-[120px] mt-[64px]">
      {
        title ? <h1 className="text-center">The Video of the project</h1> : null
      }
      <div className="max-w-[900px] mx-auto w-full h-[450px] overflow-hidden">
        <iframe className="w-full h-full object-cover rounded-lg"
          src={videoLink}
          title="YouTube video player"
        />
      </div>
    </div>
  );
};

export default TvVideo;
