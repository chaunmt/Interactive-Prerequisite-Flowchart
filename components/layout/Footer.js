import Link from "next/link";
import Image from "next/image";
import contributors from "@/contributors.json";

export default function Footer() {
  return (
    <footer className="
      relative flex flex-col items-center text-center w-full mt-auto p-4 bg-gray-100 
      border-t border-gray-300">
      
      {/* Head Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.entries(contributors.Head).map(([key, head]) => (
          <div key={key} className="
            flex flex-col items-center bg-white p-2 rounded shadow-lg 
            w-[20vw] max-w-[250px] h-[30vh] max-h-[320px]">
            
            <div className="
              relative w-[6vw] h-[6vw] max-w-[80px] max-h-[80px] bg-gray-300 
              rounded-full flex items-center justify-center mt-4 overflow-hidden">
              <Image 
                src={head.Avatar} 
                alt={`${head.Name} avatar`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-full"
              />
            </div>
            
            <h3 className="text-red-600 font-bold mt-2 text-sm">{head.Name}</h3>
            <p className="
              text-xs overflow-hidden
              hover:overflow-visible hover:whitespace-normal hover:h-auto"
            >
              {head.Role}
            </p>
            
            <div className="flex gap-2 mt-auto mb-2">
              <Link href={head.Linkedin} target="_blank">
                <div className="
                  w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔗</span>
                </div>
              </Link>
              <Link href={head.Homepage} target="_blank">
                <div className="
                  w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🏠</span>
                </div>
              </Link>
              <Link href={head.GitHub} target="_blank">
                <div className="
                  w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🐙</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Member Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.entries(contributors.Member).map(([key, member]) => (
          <div key={key} className="
            flex flex-col items-center bg-white p-2 rounded shadow 
            w-[18vw] max-w-[200px] h-[25vh] max-h-[280px]">
            
            <div className="
              relative w-[5vw] h-[5vw] max-w-[70px] max-h-[70px] bg-gray-300 
              rounded-full flex items-center justify-center mt-2 overflow-hidden">
              <Image 
                src={member.Avatar} 
                alt={`${member.Name} avatar`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-full"
              />
            </div>
            
            <h3 className="text-red-600 font-bold mt-2 text-sm">{member.Name}</h3>
            <p className="text-xs overflow-hidden hover:overflow-visible hover:whitespace-normal hover:h-auto transition-all duration-300">
              {member.Role}
            </p>
            
            <div className="flex gap-2 mt-auto mb-2">
              <Link href={member.Linkedin} target="_blank">
                <div className="
                  w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔗</span>
                </div>
              </Link>
              <Link href={member.Homepage} target="_blank">
                <div className="
                  w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🏠</span>
                </div>
              </Link>
              <Link href={member.GitHub} target="_blank">
                <div className="
                  w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">🐙</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Contributor Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.entries(contributors.Contributor).map(([key, contributor]) => (
          <div 
            key={key} 
            className="relative group flex flex-col items-center cursor-pointer">
            <Link href={contributor.GitHub} target="_blank">
              <div className="
                w-[4vw] h-[4vw] max-w-[50px] max-h-[50px] bg-gray-300 
                rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src={contributor.Avatar} 
                  alt={`${contributor.Name} avatar`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-full"
                />
              </div>
            </Link>
            <div className="
              absolute top-12 left-1/2 transform -translate-x-1/2 
              hidden group-hover:flex bg-black text-white text-xs rounded
              px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
              {contributor.Name}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Button */}
      <Link 
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart" 
        target="_blank">
        <button className="
          bg-slate-400 text-white px-4 py-1 rounded hover:bg-white hover:text-black text-xs">
          GitHub
        </button>
      </Link>

      {/* Footer Text */}
      <p className="text-xs mt-4">
        Created by and for <Link href="https://twin-cities.umn.edu/" className="md:font-bold">
          University of Minnesota - Twin Cities
        </Link> students through <Link href="https://www.socialcoding.net/" className="md:font-bold">
          Social Coding
        </Link> with data from <Link
          href="https://asr.umn.edu/applications-and-forms/applications/coursedog" className="md:font-bold">
          Coursedog
        </Link> - the University’s course, program, and catalog management system.
      </p>
      <Link href="/privacynotice" className="underline text-xs mt-1">
        Privacy Notice
      </Link>
    </footer>
  );
}
