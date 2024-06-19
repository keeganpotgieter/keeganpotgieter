export const experience = async () => {
  return (
    <div className='flex flex-col gap-4 rounded-md text-sm'>
      <h1 className='mb-4 text-2xl font-bold'>Experience</h1>

      <div className='mb-4'>
        <div className='group flex items-center justify-between text-xl font-semibold'>
          <span>necta</span>
          <a
            href='https://necta.app'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:gradient-text transform transition-all group-hover:-rotate-45'
          >
            {'->'}
          </a>
        </div>
        <p className='role mb-1 mt-1 p-1 italic'>
          Creator necta Web Application (2022 - Present)
        </p>
        <ul className='list-inside list-disc space-y-2 opacity-70'>
          <li>
            Developed a web application for Windy Hills Farm, targeting
            small-to-medium size farms and nurseries for data management and
            regulatory compliance.
          </li>
          <li>
            Implemented full-stack development practices, utilising Python,
            Django for backend, and React for frontend.
          </li>
          <li>
            Integrated AWS services for robust cloud-based hosting and data
            storage solutions.
          </li>
          <li>
            Managed the full life cycle of the first commercial application.
          </li>
        </ul>
      </div>

      <div className='mb-2'>
        <div className='text-xl font-semibold'>Windy Hills Farm</div>
        <div className='role mb-1 mt-1 italic'>
          Systems Analyst and DevOps Engineer (2018 - 2024)
        </div>
        <ul className='list-inside list-disc space-y-2 opacity-70'>
          <li>
            Conducted a comprehensive analysis of existing systems and processes
            to identify areas for technological enhancement.
          </li>
          <li>
            Developed and implemented a suite of digital solutions to modernise
            operations, including a cloud-based record-keeping system—through
            full-stack development—which reduced manual errors by 25%.
          </li>
          <li>
            Optimised farm operations through the introduction of automated
            systems for payroll and inventory management, leading to a 30%
            increase in productivity.
          </li>
          <li>
            Designed and deployed a QR code-based training system, significantly
            streamlining employee onboarding and reducing training time.
          </li>
          <li>
            Pioneered the adoption of advanced communication tools, fostering
            better collaboration and management across farm teams.
          </li>
          <li>
            Regularly evaluated and refined digital tools and systems, ensuring
            they remained efficient and aligned with the evolving needs of the
            farm.
          </li>
        </ul>
      </div>

      <div className='mb-2'>
        <div className='text-xl font-semibold'>TenantsReview</div>
        <div className='role mb-1 mt-1 italic'>
          Full Stack Developer Capstone Project (2022 Semester 2)
        </div>
        <ul className='list-inside list-disc space-y-2 opacity-70'>
          <li>
            Collaborated in a six-member team to enhance a web application for
            property search, rating, and reviews in Australia.
          </li>
          <li>
            Revamped backend code for improved efficiency and data management
            using MongoDB, Node, and Express.
          </li>
          <li>
            Introduced a watchlist feature and overhauled frontend UI using
            React, contributing to a 20% increase in user engagement.
          </li>
          <li>
            Leveraged AWS cloud services (S3, EC2, Elastic Beanstalk) to scale
            application functionality.
          </li>
        </ul>
      </div>

      <div className='mb-2'>
        <div className='text-xl font-semibold'>Betfair Australia</div>
        <div className='role mb-1 mt-1 italic'>
          Betfair Scholarship Program Internship (2021 - 2022)
        </div>
        <ul className='list-inside list-disc space-y-2 opacity-70'>
          <li>
            Awarded a scholarship involving mentorship and $1000 trading capital
            for model deployment on their betting exchange.
          </li>
          <li>
            Developed and backtested trading models on racing markets, leading
            to top three placement within the scholarship group, and an extended
            $10,000 offer with a private firm.
          </li>
          <li>
            Utilised Python, NumPy, Pandas, scikit-learn for machine learning
            and data analysis tasks.
          </li>
          <li>
            Integrated AWS and MongoDB for efficient data management and model
            deployment.
          </li>
        </ul>
      </div>

      <div className='mb-2'>
        <div className='text-xl font-semibold'>Betalytics</div>
        <div className='role mb-1 mt-1 italic'>
          Betting Exchange Automated Trading Personal Project (2021 - Present)
        </div>
        <ul className='list-inside list-disc space-y-2 opacity-70'>
          <li>
            Conceived and developed Betalytics—a project intertwining with the
            Betfair Scholarship—focusing on market data analysis and predictive
            modelling.
          </li>
          <li>
            Applied advanced machine learning techniques using Python, NumPy,
            Pandas, and scikit-learn.
          </li>
          <li>
            Implemented data extraction and backtesting strategies to refine
            trading models, improving profitability by 15%.
          </li>
        </ul>
      </div>
    </div>
  );
};
export const e = experience;

experience.description = 'Get a summary of my work experience';
