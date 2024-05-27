import React, { useEffect, useState } from 'react'
import quote from '../../Assets/img/quote.svg'
import starts from '../../Assets/img/starts.png'
import { Link } from 'react-router-dom';



const Card = ({ testimonial, imageUrl, name, handle }) => (
    <section className="card d-flex flex-column">
        <img width={25} height={20} src={quote} alt='quote' />
        <p className="text" role="paragraph" aria-label="testimonial">
            {testimonial}... <Link to='/'>Read More</Link>
        </p>
        <div className="d-flex mt-3 justify-content-between align-items-center">
            <div className="d-flex">
                {/* <span className="userImg">
                    <img width={50} height={50} src={imageUrl} alt="" />
                </span> */}
                <span className="UserName">
                    <h4>{name}</h4>
                    {handle && <p className="Profile">{handle}</p>}
                </span>
            </div>
            <img className='stars' width={125} height={20} src={starts} alt='starts' />
        </div>

    </section>
);

const Testimonial = () => {



    const cardData = [
        {
            testimonial: "Mid Journey user-friendly interface has been a blessing for our small business, allowing us to create professional-grade visuals without hassle.",
            imageUrl: "",
            name: "Nathan Brown",
            handle: ""
        },
        {
            testimonial: "Accessibility has opened up new possibilities for my personal projects, enabling me to explore my creativity without limitations.",
            imageUrl: "",
            name: "Hannah Johnson",
            handle: ""
        },
        {
            testimonial: "As a freelancer, Mid Journey's versatility has helped me attract more clients by offering high-quality visuals that exceed expectations.",
            imageUrl: "",
            name: "Ryan Smith",
            handle: ""
        },
        {
            testimonial: "Mid Journey ease of use has made it accessible to a wider audience, democratizing the world of digital design and empowering individuals to express themselves visually.",
            imageUrl: "",
            name: "Emma White",
            handle: ""
        },
        {
            testimonial: "Mid Journey's capabilities align perfectly with our nonprofit organization's goals, allowing us to create impactful visuals for our campaigns.",
            imageUrl: "",
            name: "Olivia Davis",
            handle: ""
        },
        {
            testimonial: "Efficiency has allowed us to invest more resources into other aspects of our projects, ultimately enhancing the overall quality and effectiveness of our work.",
            imageUrl: "",
            name: "Ethan Clark",
            handle: ""
        },
        {
            testimonial: "Mid Journey AI efficiency has allowed us to invest more resources into other aspects of our projects, ultimately enhancing the overall quality and effectiveness of our work.",
            imageUrl: "",
            name: "Ethan Clark",
            handle: ""
        },
        {
            testimonial: "Mid Journey's simplicity has simplified our image creation process, saving us both time and effort while still delivering exceptional results.",
            imageUrl: "",
            name: "Sophie Roberts",
            handle: ""
        },
        {
            testimonial: "Mid Journey consistently amazes us with its ability to generate stunning visuals that elevate our brand.",
            imageUrl: "",
            name: "Lucas Taylor",
            handle: ""
        },
        {
            testimonial: "Mid Journey has transformed our social media presence, enabling us to consistently produce engaging visuals that resonate with our audience.",
            imageUrl: "",
            name: "Ava Harris",
            handle: ""
        },
        {
            testimonial: "Mid Journey's versatility has allowed us to experiment with different visual concepts and iterate on our ideas with ease.",
            imageUrl: "",
            name: "Mason Wilson",
            handle: ""
        },
        {
            testimonial: "Accessibility has made it an attractive option for educational institutions, providing students with access to cutting-edge design technology.",
            imageUrl: "",
            name: "Isabella Martinez",
            handle: ""
        },
        {
            testimonial: "Mid Journey's efficiency has been a game-changer for our startup, enabling us to create professional-looking visuals that help us stand out.",
            imageUrl: "",
            name: "Liam Brown",
            handle: ""
        },
        {
            testimonial: "Mid Journey user-friendly features have streamlined our content creation process, allowing us to produce high-quality visuals effortlessly.",
            imageUrl: "",
            name: "Ella Garcia",
            handle: ""
        },
        {
            testimonial: "Mid Journey's capabilities have allowed us to scale our image generation efforts without hassle, resulting in a more efficient workflow.",
            imageUrl: "",
            name: "Noah Martinez",
            handle: ""
        },
        {
            testimonial: "Intuitive design has made it a no-brainer for our agency, enabling us to offer top-notch design services to our clients effortlessly.",
            imageUrl: "",
            name: "Grace Thompson",
            handle: ""
        },
    ];



    const [divCount, setDivCount] = useState(0); // State to keep track of the number of divs


    // Function to add a new div after every 60 seconds (1000 ms * 60)
    const addDivAutomatically = () => {
        setDivCount(divCount + 1);
    };

    useEffect(() => {
        // Set interval to add a new div every 60 seconds
        const intervalId = setInterval(addDivAutomatically, 1000);

        // Clean up function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [divCount]); // Run effect when divCount changes


    return (
        <section className='Testimonial'>

            <div className='sectionTitle'>
                <h2>Happy Clients</h2>
                <p>Your satisfaction is our greatest achievement, thank you for being a part of our journey!</p>
            </div>

            <div className='bgShadow'>
                <div className="Testimonial_logos overflow-hidden position-relative d-flex">
                    <div className="Testimonial_logos_slide d-flex" style={{ whiteSpace: 'nowrap' }}>
                    {cardData.map((card, index) => (
                           
                                
                                    <Card key={index} className="appended-div"
                                        testimonial={card.testimonial}
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        handle={card.handle}
                                    />
                                
                          
                        ))}
                    </div>
                </div>

                <div className="Testimonial_logos reavers-slider overflow-hidden position-relative d-flex">
                    <div className="Testimonial_logos_slide d-flex" style={{ whiteSpace: 'nowrap' }}>
                        {cardData.map((card, index) => (
                           
                                    <Card className="appended-div"
                                        key={index}
                                        testimonial={card.testimonial}
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        handle={card.handle}
                                    />
                           
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Testimonial