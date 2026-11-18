
const services = [
  {
    name: 'Haircut',
    image: '/images/services/haircut.jpg',
    className: 'hair-card',
    icon: '✂',
  },
  {
    name: 'Facial',
    image: '/images/services/facial.jpg',
    className: 'facial-card',
    icon: '✧',
  },
  {
    name: 'Bridal Makeup',
    image: '/images/services/bridal.jpg',
    className: 'bridal-card',
    icon: '♕',
  },
  {
    name: 'Manicure',
    image: '/images/services/manicure.jpg',
    className: 'manicure-card',
    icon: '◇',
  },
  {
    name: 'Pedicure',
    image: '/images/services/pedicure.jpg',
    className: 'pedicure-card',
    icon: '✧',
  },
  {
    name: 'Massage',
    image: '/images/services/massage.jpg',
    className: 'massage-card',
    icon: '❀',
  },
];

export default function HeroMedia() {
  return (
    <div className="hero-collage relative mx-auto aspect-[1/1] w-full max-w-[620px]">

      {/* Decorative background */}
      <div className="absolute inset-[12%] rounded-full border border-[#D4AF37]/40" />

      <div className="absolute left-[48%] top-[5%] text-3xl text-[#D4AF37]">
        ✦
      </div>

      <div className="absolute bottom-[5%] right-[12%] text-3xl text-[#D4AF37]">
        ✦
      </div>

      {services.map((service) => (
        <div
          key={service.name}
          data-service-card
          className={`service-card ${service.className} absolute overflow-hidden rounded-[24px] border-[5px] border-white shadow-xl`}
        >
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover"
          />

          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-black shadow-md">
            <span className="mr-1">{service.icon}</span>
            {service.name}
          </span>
        </div>
      ))}
    </div>
  );
}
