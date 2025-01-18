'use client'
import React from "react";

type ChecklistProps = {
  yourMajorChecklist: any;
};

type customInfoObj = {
  major: any;
  curCreditsInProgram: string;
  validCourses: string;
  programMaxCredits: any;
};

export function Checklist({ yourMajorChecklist }: ChecklistProps) {
  return (
    <div>
      {yourMajorChecklist.map((element: any, index: any) => (
        <div key={`element-${index}`}>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            {element.requirementTitle}
          </h2>
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {Object.entries(element as customInfoObj).map(([key, value]) => {
              if (
                ![
                  "requirementTitle",
                  "validCourses",
                  "curCreditsInProgram",
                  "programMaxCredits",
                  "major",
                ].includes(key) &&
                !key.includes("?")
              ) {
                return (
                  <li
                    key={`item-${index}-${key}`}
                    className="flex items-center"
                  >
                    <svg
                      className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                        value.includes("True")
                          ? "text-green-500 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {key}
                  </li>
                );
              } else if (key.includes("?")) {
                const k = key.slice(0, -1);
                const parseSubRules = JSON.parse(value);
                const subRules = parseSubRules[1].map(
                  (
                    subRule: {
                      [x: string]: string | string[];
                    },
                    subIndex: number
                  ) => {
                    const subKey = Object.keys(subRule)[0];
                    return (
                      <li
                        key={`subrule-${index}-${subIndex}-${subKey}`}
                        className="flex items-center"
                      >
                        <svg
                          className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                            subRule[subKey].includes("True")
                              ? "text-green-500 dark:text-green-400"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        {subKey}
                      </li>
                    );
                  }
                );
                return (
                  <div key={`subrules-${index}-${k}`}>
                    <li className="flex items-center">
                      <svg
                        className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                          parseSubRules[0].includes("True")
                            ? "text-green-500 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      {k}
                    </li>
                    <ul className="ps-8 mt-2 space-y-1 list-disc list-inside">
                      {subRules}
                    </ul>
                  </div>
                );
              }
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
