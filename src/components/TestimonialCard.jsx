import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial }) => {
  const { name, avatar, text, rating, product } = testimonial;
  
  const renderRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <p className="text-sm text-pink-soft">{product}</p>
        </div>
      </div>
      
      <div className="flex mb-3">{renderRating()}</div>
      
      <p className="text-gray-600 italic">"{text}"</p>
    </div>
  );
};

export default TestimonialCard; 