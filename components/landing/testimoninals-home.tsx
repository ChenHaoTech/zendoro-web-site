import IframeResizer from 'iframe-resizer-react'

function TestimonialsHome() {
  return (
    <>
      {process.env.NEXT_PUBLIC_TESTIMONIAL_URL ? (
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h2 mb-4">What our users say</h1>
                <p className="text-xl text-gray-600">Don't take my word for it. See what our users have to say about Fleeting Notes</p>
              </div>
              <IframeResizer
                log
                src={process.env.NEXT_PUBLIC_TESTIMONIAL_URL}
                className="w-full overflow-hidden"
              ></IframeResizer>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default TestimonialsHome;