export const education = async () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>The University of Sydney</h2>
          <span className='hidden text-sm sm:block'>2020 - 2023</span>
        </div>

        <span>Software Engineering (Honours)</span>

        <ul className='_flex-col mt-2 list-disc gap-1'>
          <li className='list-item list-inside'>
            Graduated with <b>First Class Honours</b>
          </li>

          <li className='list-inside'>
            Achieved a <b>Distinction Average</b>
          </li>
        </ul>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>Macarthur Anglican School</h2>
          <span className='hidden text-sm sm:block'>Graduated 2018</span>
        </div>

        <span>Year 12 Certificate</span>

        <ul className='_flex-col mt-2 list-disc gap-1'>
          <li className='list-item list-inside'>
            ATAR of <b>95.20</b>
          </li>

          <li className='list-inside'>
            Specialised in Math Extension 1 & 2 and Physics
          </li>
        </ul>
      </div>
    </div>
  );
};
export const edu = education;

education.description = 'Get a summary of my education';
