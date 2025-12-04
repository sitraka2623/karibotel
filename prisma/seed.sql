-- Insérer un utilisateur admin
INSERT INTO users (id, email, password, nom, role, createdAt, updatedAt) 
VALUES (
  'admin001',
  'admin@karibotel.com',
  '$2b$10$9W9aKVQMe7oX.taEnncQCON2olK5yzlgsAVFvozu8zhGQrB6y1o0y',
  'Administrateur',
  'admin',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE email=email;

-- Insérer les chambres B01 à B14 (prix en Ariary)
INSERT INTO chambres (id, numero, description, prix, disponible, createdAt, updatedAt) VALUES
('ch01', 'B01', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 425000, 1, NOW(), NOW()),
('ch02', 'B02', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 450000, 1, NOW(), NOW()),
('ch03', 'B03', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 475000, 1, NOW(), NOW()),
('ch04', 'B04', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 500000, 1, NOW(), NOW()),
('ch05', 'B05', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 425000, 1, NOW(), NOW()),
('ch06', 'B06', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 450000, 1, NOW(), NOW()),
('ch07', 'B07', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 475000, 1, NOW(), NOW()),
('ch08', 'B08', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 500000, 1, NOW(), NOW()),
('ch09', 'B09', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 425000, 1, NOW(), NOW()),
('ch10', 'B10', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 450000, 1, NOW(), NOW()),
('ch11', 'B11', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 475000, 1, NOW(), NOW()),
('ch12', 'B12', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 500000, 1, NOW(), NOW()),
('ch13', 'B13', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 425000, 1, NOW(), NOW()),
('ch14', 'B14', 'Chambre confortable avec vue sur le jardin. Équipée d''un lit double, salle de bain privée, TV et WiFi gratuit.', 450000, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE numero=numero;

-- Insérer les informations piscine
INSERT INTO piscine (id, horaires, reglement, description, createdAt, updatedAt) VALUES
('piscine01', 
'Lundi - Dimanche : 8h00 - 20h00
Fermeture exceptionnelle le mardi pour entretien',
'- La piscine est réservée aux clients de l''hôtel
- Douche obligatoire avant l''accès
- Pas de plongeon
- Surveillance non assurée, baignade sous votre responsabilité
- Les enfants doivent être accompagnés d''un adulte
- Respect des autres clients',
'Notre piscine chauffée de 15m x 8m vous accueille dans un cadre verdoyant et apaisant. 
Profitez de transats confortables et d''un espace détente pour vous relaxer après une journée de visite.
L''accès à la piscine est inclus dans votre réservation.',
NOW(),
NOW())
ON DUPLICATE KEY UPDATE id=id;
