import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  HeartIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';

const activity = [
  {
    id: 1,
    type: 'created',
    person: { name: 'Chelsea Hagon' },
    date: '7d ago',
    dateTime: '2023-01-23T10:32',
  },
  {
    id: 2,
    type: 'edited',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:03',
  },
  {
    id: 3,
    type: 'sent',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:24',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 5,
    type: 'viewed',
    person: { name: 'Alex Curren' },
    date: '2d ago',
    dateTime: '2023-01-24T09:12',
  },
  {
    id: 6,
    type: 'paid',
    person: { name: 'Alex Curren' },
    date: '1d ago',
    dateTime: '2023-01-24T09:20',
  },
];

interface ResultDetailProps {
  isOpen: boolean;
  onClose: () => void;
  currentRacer: any | null | undefined;
}
const ResultDetail: React.FC<ResultDetailProps> = ({ isOpen, currentRacer, onClose }) => {

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="h-full overflow-y-auto bg-white p-8">
                    <div className="space-y-6 pb-16">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">Information</h3>
                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Uploaded by</dt>
                            <dd className="text-gray-900">Marie Culver</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Created</dt>
                            <dd className="text-gray-900">June 8, 2020</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Last modified</dt>
                            <dd className="text-gray-900">June 8, 2020</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Dimensions</dt>
                            <dd className="text-gray-900">4032 x 3024</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Resolution</dt>
                            <dd className="text-gray-900">72 x 72</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex">
                        <div className="lg:col-start-3">
                          {/* Activity feed */}
                          <h2 className="text-sm font-semibold leading-6 text-gray-900">
                            Activity
                          </h2>
                          <ul role="list" className="mt-6 space-y-6">
                            {activity.map((activityItem, activityItemIdx) => (
                              <li key={activityItem.id} className="relative flex gap-x-4">
                                <div
                                  className={clsx([
                                    activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                                    'absolute left-0 top-0 flex w-6 justify-center',
                                  ])}
                                >
                                  <div className="w-px bg-gray-200" />
                                </div>
                                {activityItem.type === 'commented' ? (
                                  <>
                                    <img
                                      src={activityItem.person.imageUrl}
                                      alt=""
                                      className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                      <div className="flex justify-between gap-x-4">
                                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                                          <span className="font-medium text-gray-900">
                                            {activityItem.person.name}
                                          </span>{' '}
                                          commented
                                        </div>
                                        <time
                                          dateTime={activityItem.dateTime}
                                          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                        >
                                          {activityItem.date}
                                        </time>
                                      </div>
                                      <p className="text-sm leading-6 text-gray-500">
                                        {activityItem.comment}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                      {activityItem.type === 'paid' ? (
                                        <CheckCircleIcon
                                          className="h-6 w-6 text-sky-600"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                      )}
                                    </div>
                                    <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                      <span className="font-medium text-gray-900">
                                        {activityItem.person.name}
                                      </span>{' '}
                                      {activityItem.type} the invoice.
                                    </p>
                                    <time
                                      dateTime={activityItem.dateTime}
                                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                    >
                                      {activityItem.date}
                                    </time>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ResultDetail;
