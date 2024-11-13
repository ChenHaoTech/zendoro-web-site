function Cta() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="bg-blue-600 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl" data-aos="zoom-y-out">

            <div className="flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left">
                <h3 className="h3 text-white mb-2">Join the Discord community!</h3>
                <p className="text-white text-lg opacity-75">Make feature requests, report bugs, or chat with me! Otherwise you can reach me at <a className="underline" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a></p>
              </div>

              {/* CTA button */}
              <div>
                <a className="btn text-blue-600 bg-gradient-to-r from-blue-100 to-white w-36" href={process.env.NEXT_PUBLIC_LINK_DISCORD}>Join Now</a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Cta;
