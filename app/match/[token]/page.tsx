'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import { User, Calendar, MapPin, Briefcase, GraduationCap, Heart, AlertCircle, Users, Baby, Scale, Languages, Star, Moon, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '@/src/config';

interface ProfileData {
  // Basic Information
  id: number;
  firstname?: string;
  lastname?: string;
  name: string;
  age?: number;
  gender?: string;
  birthdate?: string;
  birthtime?: string;
  birthplace?: string;
  
  // Photos (can be array of strings for backward compatibility, or array of objects with thumbnail/fullSize)
  photos?: (string | { thumbnail?: string; fullSize?: string })[];
  
  // User's photo (the person viewing the match)
  user_photo?: { thumbnail?: string; fullSize?: string } | null;
  
  // Location
  address?: string;
  city?: string;
  state_id?: number;
  state_name?: string;
  country_id?: number;
  country_name?: string;
  location?: string;
  
  // Marital Status & Children
  m_status?: string;
  tot_children?: number;
  status_children?: string;
  childAcceptance?: string;
  
  // Religion & Caste
  religion?: number;
  religion_id?: number;
  religion_name?: string;
  caste?: number;
  caste_id?: number;
  caste_name?: string;
  subcaste?: string;
  gothra?: string;
  
  // Horoscope
  star?: string;
  moonsign?: string;
  manglik?: string;
  
  // Education & Profession
  edu_detail?: number;
  education_id?: number;
  education_name?: string;
  occupation?: number;
  occupation_id?: number;
  occupation_name?: string;
  emp_in?: string;
  designation?: string;
  income?: string;
  
  // Physical Attributes
  height?: number;
  height_formatted?: string;
  weight?: number;
  b_group?: string;
  complexion?: string;
  bodytype?: string;
  
  // Lifestyle
  diet?: string;
  smoke?: string;
  drink?: string;
  residence?: string;
  
  // Language
  m_tongue?: number;
  mother_tongue_id?: number;
  mother_tongue_name?: string;
  languages_known?: string;
  
  // Family Details
  family_details?: string;
  family_type?: string;
  family_status?: string;
  father_name?: string;
  mother_name?: string;
  father_living_status?: string;
  mother_living_status?: string;
  father_occupation?: string;
  mother_occupation?: string;
  no_of_brothers?: number;
  no_of_sisters?: number;
  no_marri_brother?: number;
  no_marri_sister?: number;
  
  // Profile Text
  profile_text?: string;
  bio?: string;
  
  createdAt?: string;
  [key: string]: any;
}

export default function MatchProfilePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Invalid link');
        setLoading(false);
        return;
      }

      try {
        // Fetch profile data from API
        // The backend will validate the token and check expiry (1 week)
        const response = await fetch(`${API_URL}/match/profile/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Profile not found or link is invalid.');
          } else if (response.status === 410 || response.status === 403) {
            setExpired(true);
            setError('This link has expired. Please request a new match link from BiheSewa.');
          } else {
            setError('Failed to load profile. Please try again later.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        const profileData = data.profile || data;
        console.log('[MatchProfilePage] Profile data received:', {
          hasProfile: !!profileData,
          hasUserPhoto: !!profileData.user_photo,
          userPhoto: profileData.user_photo,
          hasPhotos: !!profileData.photos,
          photosCount: profileData.photos?.length
        });
        setProfile(profileData);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Handle keyboard navigation and body scroll lock for photo viewer
  useEffect(() => {
    if (selectedPhotoIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    // Prevent body scroll when viewer is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowLeft' && profile?.photos) {
        const newIndex = selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : profile.photos.length - 1;
        setSelectedPhotoIndex(newIndex);
      } else if (e.key === 'ArrowRight' && profile?.photos) {
        const newIndex = selectedPhotoIndex < profile.photos.length - 1 ? selectedPhotoIndex + 1 : 0;
        setSelectedPhotoIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, profile?.photos]);

  // Handle swipe gestures for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !profile?.photos) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedPhotoIndex !== null) {
      // Swipe left - next photo
      const newIndex = selectedPhotoIndex < profile.photos.length - 1 ? selectedPhotoIndex + 1 : 0;
      setSelectedPhotoIndex(newIndex);
    }
    if (isRightSwipe && selectedPhotoIndex !== null) {
      // Swipe right - previous photo
      const newIndex = selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : profile.photos.length - 1;
      setSelectedPhotoIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <PageLayout
        title="Loading Profile"
        subtitle="Please wait..."
        icon={<User className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
        disableAutoNav={true}
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title={expired ? "Link Expired" : "Error"}
        subtitle={expired ? "This match link is no longer valid" : "Unable to load profile"}
        icon={<AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 dark:text-red-400" />}
        disableAutoNav={true}
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          {expired && (
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Match links expire after 1 week for security and privacy reasons.
            </p>
          )}
          <button
            onClick={() => router.push('/contact')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            Contact Support
          </button>
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout
        title="Profile Not Found"
        subtitle="The requested profile could not be found"
        icon={<User className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
        disableAutoNav={true}
      >
        <div className="text-center py-12">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The profile you're looking for doesn't exist or the link is invalid.
          </p>
        </div>
      </PageLayout>
    );
  }

  // Create overlapping profile photos component
  const ProfilePhotosIcon = () => {
    const matchedPhoto = profile.photos && profile.photos.length > 0 
      ? (typeof profile.photos[0] === 'string' ? profile.photos[0] : profile.photos[0].thumbnail || profile.photos[0].fullSize)
      : null;
    const userPhoto = profile.user_photo?.thumbnail || profile.user_photo?.fullSize || null;
    
    // Debug logging
    console.log('[ProfilePhotosIcon] Photo data:', {
      hasMatchedPhoto: !!matchedPhoto,
      matchedPhoto,
      hasUserPhoto: !!userPhoto,
      userPhoto,
      userPhotoObj: profile.user_photo
    });
    
    if (!matchedPhoto && !userPhoto) {
      // Fallback to Heart icon if no photos
      return <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-600 dark:text-pink-400" />;
    }
    
    return (
      <div className="relative flex items-center">
        {/* Matched Profile Photo (larger, behind) */}
        {matchedPhoto ? (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md bg-gray-100 dark:bg-gray-800">
            <img
              src={matchedPhoto}
              alt="Matched profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">${profile.name?.charAt(0).toUpperCase() || 'M'}</div>`;
              }}
            />
          </div>
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm md:text-base font-semibold border-2 border-white dark:border-gray-800 shadow-md">
            {profile.name?.charAt(0).toUpperCase() || 'M'}
          </div>
        )}
        
        {/* User Photo (smaller, overlapping from right) */}
        {userPhoto && (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md bg-gray-100 dark:bg-gray-800 -ml-3 md:-ml-4 relative z-10">
            <img
              src={userPhoto}
              alt="Your profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold">U</div>`;
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <PageLayout
      title="Matched Profile"
      subtitle="View your potential match"
      icon={<ProfilePhotosIcon />}
      disableAutoNav={true}
    >
      <div className="space-y-6">
        {/* Profile Photos */}
        {profile.photos && profile.photos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profile.photos.map((photo: string | { thumbnail?: string; fullSize?: string }, index: number) => {
                // Handle both old format (string) and new format (object)
                const thumbnailUrl = typeof photo === 'string' ? photo : photo.thumbnail || photo.fullSize;
                if (!thumbnailUrl) return null;
                
                return (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={`${profile.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo.png';
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full Screen Photo Viewer */}
        {selectedPhotoIndex !== null && profile.photos && profile.photos.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex(null);
              }}
              className="absolute top-4 right-4 z-10 p-3 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-all backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Previous Button */}
            {profile.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : profile.photos!.length - 1;
                  setSelectedPhotoIndex(newIndex);
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-all backdrop-blur-sm"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            )}

            {/* Photo */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {(() => {
                const currentPhoto = profile.photos[selectedPhotoIndex];
                // Use full-size image if available, otherwise fallback to thumbnail or string URL
                const photoUrl = typeof currentPhoto === 'string' 
                  ? currentPhoto 
                  : (currentPhoto.fullSize || currentPhoto.thumbnail);
                
                return (
                  <img
                    src={photoUrl}
                    alt={`${profile.name} - Photo ${selectedPhotoIndex + 1}`}
                    className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg select-none"
                    style={{ 
                      maxWidth: '95vw', 
                      maxHeight: '95vh',
                      width: 'auto',
                      height: 'auto'
                    }}
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                );
              })()}
            </div>

            {/* Next Button */}
            {profile.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = selectedPhotoIndex < profile.photos!.length - 1 ? selectedPhotoIndex + 1 : 0;
                  setSelectedPhotoIndex(newIndex);
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full text-white transition-all backdrop-blur-sm"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            )}

            {/* Photo Counter */}
            {profile.photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black bg-opacity-70 rounded-full text-white text-sm backdrop-blur-sm">
                {selectedPhotoIndex + 1} / {profile.photos.length}
              </div>
            )}
          </div>
        )}

        {/* Basic Profile Information */}
        <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            {profile.photos && profile.photos.length > 0 ? (
              <div 
                className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhotoIndex(0)}
              >
                <img
                  src={typeof profile.photos[0] === 'string' ? profile.photos[0] : profile.photos[0].thumbnail || profile.photos[0].fullSize}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-semibold">${profile.name?.charAt(0).toUpperCase() || 'U'}</div>`;
                  }}
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                {profile.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.age && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age: {profile.age}</p>
                )}
                {profile.gender && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">• {profile.gender}</p>
                )}
                {profile.m_status && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">• {profile.m_status}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Text / Bio */}
          {(profile.profile_text || profile.bio) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                About
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {profile.profile_text || profile.bio}
              </p>
            </div>
          )}

          {/* Basic Details Grid */}
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            {profile.location && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.location}</p>
                  {profile.address && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{profile.address}</p>
                  )}
                </div>
              </div>
            )}

            {profile.occupation_name && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Occupation</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.occupation_name}</p>
                  {profile.designation && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{profile.designation}</p>
                  )}
                  {profile.emp_in && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">{profile.emp_in}</p>
                  )}
                  {profile.income && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">Income: {profile.income}</p>
                  )}
                </div>
              </div>
            )}

            {profile.education_name && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Education</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.education_name}</p>
                </div>
              </div>
            )}

            {profile.birthdate && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(profile.birthdate).toLocaleDateString()}
                    {profile.birthplace && ` • ${profile.birthplace}`}
                  </p>
                  {profile.birthtime && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Time: {profile.birthtime}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Religion & Caste */}
        {(profile.religion_name || profile.caste_name || profile.subcaste || profile.gothra) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Religion & Caste
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.religion_name && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Religion</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.religion_name}</p>
                </div>
              )}
              {profile.caste_name && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Caste</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.caste_name}</p>
                </div>
              )}
              {profile.subcaste && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subcaste</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.subcaste}</p>
                </div>
              )}
              {profile.gothra && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Gothra</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.gothra}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Horoscope Details */}
        {(profile.star || profile.moonsign || profile.manglik) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Horoscope Details
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {profile.star && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Star</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.star}</p>
                </div>
              )}
              {profile.moonsign && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Moonsign</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.moonsign}</p>
                </div>
              )}
              {profile.manglik && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Manglik</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.manglik}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Physical Attributes */}
        {(profile.height || profile.weight || profile.b_group || profile.complexion || profile.bodytype) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Physical Attributes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.height_formatted && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Height</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.height_formatted}</p>
                </div>
              )}
              {profile.weight && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Weight</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.weight} kg</p>
                </div>
              )}
              {profile.b_group && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Blood Group</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.b_group}</p>
                </div>
              )}
              {profile.complexion && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Complexion</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.complexion}</p>
                </div>
              )}
              {profile.bodytype && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Body Type</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.bodytype}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lifestyle */}
        {(profile.diet || profile.smoke || profile.drink || profile.residence) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Lifestyle
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.diet && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Diet</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.diet}</p>
                </div>
              )}
              {profile.smoke && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Smoking</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.smoke}</p>
                </div>
              )}
              {profile.drink && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Drinking</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.drink}</p>
                </div>
              )}
              {profile.residence && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Residence Status</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.residence}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Language */}
        {(profile.mother_tongue_name || profile.languages_known) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Language
            </h2>
            <div className="space-y-2">
              {profile.mother_tongue_name && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Mother Tongue</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.mother_tongue_name}</p>
                </div>
              )}
              {profile.languages_known && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Languages Known</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.languages_known}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marital Status & Children */}
        {(profile.m_status || profile.tot_children || profile.status_children || profile.childAcceptance) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Baby className="w-4 h-4" />
              Marital Status & Children
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.m_status && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Marital Status</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.m_status}</p>
                </div>
              )}
              {profile.tot_children !== undefined && profile.tot_children !== null && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Children</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {profile.tot_children} {profile.tot_children === 1 ? 'child' : 'children'}
                    {profile.status_children && ` • ${profile.status_children}`}
                  </p>
                </div>
              )}
              {profile.childAcceptance && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Accepts Partner with Children</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.childAcceptance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(profile.family_details || profile.family_type || profile.family_status || 
          profile.father_name || profile.mother_name || profile.father_occupation || profile.mother_occupation ||
          profile.no_of_brothers !== undefined || profile.no_of_sisters !== undefined) && (
          <div className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Family Details
            </h2>
            <div className="space-y-4">
              {profile.family_details && (
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Family Details</p>
                  <p className="text-sm text-gray-900 dark:text-white">{profile.family_details}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                {profile.family_type && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Family Type</p>
                    <p className="text-sm text-gray-900 dark:text-white">{profile.family_type}</p>
                  </div>
                )}
                {profile.family_status && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Family Status</p>
                    <p className="text-sm text-gray-900 dark:text-white">{profile.family_status}</p>
                  </div>
                )}
              </div>
              {(profile.father_name || profile.mother_name) && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Parents</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.father_name && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Father</p>
                        <p className="text-sm text-gray-900 dark:text-white">{profile.father_name}</p>
                        {profile.father_occupation && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{profile.father_occupation}</p>
                        )}
                        {profile.father_living_status && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">{profile.father_living_status}</p>
                        )}
                      </div>
                    )}
                    {profile.mother_name && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Mother</p>
                        <p className="text-sm text-gray-900 dark:text-white">{profile.mother_name}</p>
                        {profile.mother_occupation && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{profile.mother_occupation}</p>
                        )}
                        {profile.mother_living_status && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">{profile.mother_living_status}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {(profile.no_of_brothers !== undefined || profile.no_of_sisters !== undefined || 
                profile.no_marri_brother !== undefined || profile.no_marri_sister !== undefined) && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Siblings</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.no_of_brothers !== undefined && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Brothers</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {profile.no_of_brothers} total
                          {profile.no_marri_brother !== undefined && ` (${profile.no_marri_brother} married)`}
                        </p>
                      </div>
                    )}
                    {profile.no_of_sisters !== undefined && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sisters</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {profile.no_of_sisters} total
                          {profile.no_marri_sister !== undefined && ` (${profile.no_marri_sister} married)`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Interested in this match?
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Contact BiheSewa to proceed with this match or request more information.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/61467877926"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <span>Contact via WhatsApp</span>
            </a>
            <a
              href="mailto:support@bihesewa.com"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

