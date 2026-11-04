import type { CSSProperties, ReactNode } from "react";
import { FramedPhoto } from "@/components/scene/framed-photo";
import { FurniturePiece, Plant, RoomWindow } from "@/components/scene/decor";
import { photos } from "@/lib/gallery";
import { toneColor, type Room } from "@/lib/scene";

/**
 * ---------------------------------------------------------------------------
 * PIÈCE — cadre d'une page de contenu
 * ---------------------------------------------------------------------------
 * Une pièce simple : un mur, une fenêtre, des photos encadrées, un meuble au
 * sol. Le contenu de la page — inchangé — est accroché au mur sur un grand
 * tableau encadré de bois, au centre : c'est lui que l'on vient lire, le
 * décor reste sur les bords.
 *
 * Sur mobile, le décor se range au-dessus du tableau (plaque, puis fenêtre et
 * photos côte à côte) et le tableau occupe toute la largeur.
 */
export function RoomScene({ room, children }: { room: Room; children: ReactNode }) {
  const wall = room.photos.map((i) => photos[i]).filter(Boolean);

  return (
    <div className="room" style={{ "--room": toneColor[room.tone] } as CSSProperties}>
      <div className="room-wall" aria-hidden="true" />

      {/* Haut du mur : fenêtre, plaque de la pièce, photos encadrées */}
      <div className="container relative flex flex-wrap items-end justify-center gap-x-8 gap-y-5 pt-6 md:justify-between md:pt-8">
        {/* Sur mobile, la fenêtre s'efface : le contenu doit arriver vite. */}
        <RoomWindow className="order-2 hidden h-[150px] w-auto shrink-0 sm:block md:order-1" />

        <p className="room-plaque order-1 w-full md:order-2 md:w-auto">
          <span className="room-plaque-kicker">Vous êtes dans la pièce</span>
          <span className="room-plaque-name">{room.label}</span>
          {room.description && <span className="room-plaque-desc">{room.description}</span>}
        </p>

        {wall.length > 0 && (
          <div className="order-3 flex items-end gap-4">
            {wall.map((photo, i) => (
              <FramedPhoto key={photo.src} photo={photo} tilt={i % 2 ? 1.5 : -1.2} />
            ))}
          </div>
        )}
      </div>

      {/* Le tableau : tout le contenu existant de la page */}
      <div className="container relative mt-6 md:mt-8">
        <div className="room-board">{children}</div>
      </div>

      {/* Sol : plinthe, parquet et mobilier */}
      <div className="room-floor" aria-hidden="true">
        <div className="container relative flex h-full items-end justify-between">
          <Plant className="relative -mb-1 h-[110px] w-auto" />
          <FurniturePiece kind={room.furniture} className="relative -mb-1 h-[110px] w-auto sm:h-[130px]" />
        </div>
      </div>
    </div>
  );
}
