import TextEntry from './TextEntry';

export default function Section() {
    return (
        <>
            <section>
                <h2>Highlights</h2>
                <h3>Remember to live out our values</h3>
                <ol>
                    <li>Relentless Learning and Growth</li>
                    <li>Creative Problem Solving</li>
                    <li>Curiosity-Driven Exploration</li>
                </ol>

                <h3>Upcoming Events</h3>
                <ul>
                    <li><b>Feb 7: </b> Employee Hack-a-ston</li>
                    <li><b>Mar 7: </b> Food Bank Volunteering</li>
                    <li><b>Apr 4: </b> Company Retreat</li>
                </ul>
            </section>

            <section>
                <h2>Latest Event</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi laudantium eos atque sed debitis eum deleniti cumque saepe aut voluptatibus, dolores commodi corporis quibusdam
                    numquam perferendis, molestias tenetur suscipit!.</p>
                <img 
                    src="https://plus.unsplash.com/premium_photo-1709247069711-068d383b8497?q=80&w=2970&auto=format&fit=crop"
                    style={{ width: "35%" }}
                    alt="Kickball outing" 
                />
                <img src="https://plus.unsplash.com/premium_photo-1661429511577-b165fc04718f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{width: "35%"}}
                    alt="Happy Hour"
                />
            </section>

            <section>
                <TextEntry />
            </section>
        </>
    )
}