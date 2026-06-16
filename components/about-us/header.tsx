const Header = () => {
  return (
    <section
      aria-labelledby="about-hero-title"
      aria-describedby="about-hero-description"
      className="h-[400px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/about-us/header.png')" }}
    >
      <div className="flex flex-col justify-center h-full w-[90%] mx-auto">
        <h1
          id="about-hero-title"
          className="text-white text-[48px] text-start leading-[48px] font-semi-bold mb-6"
        >
          About Us
        </h1>
        <p
          id="about-hero-description"
          className="text-[--content2] text-xl font-normal leading-7 "
        >
          Building brighter futures for children around the world through
          education, support, and community partnership.
        </p>
      </div>
    </section>
  );
};

export default Header;
